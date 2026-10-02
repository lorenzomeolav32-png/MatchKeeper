import {
  pgTable,
  pgEnum,
  uuid,
  text,
  timestamp,
  doublePrecision,
  numeric,
  integer,
  boolean,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// --- Enums ---

export const userRole = pgEnum("user_role", ["player", "goalkeeper"]);
export const matchStatus = pgEnum("match_status", [
  "open",
  "assigned",
  "completed",
  "cancelled",
]);
export const applicationStatus = pgEnum("application_status", [
  "pending",
  "accepted",
  "rejected",
  "withdrawn",
]);
export const paymentStatus = pgEnum("payment_status", [
  "held",
  "released",
  "refunded",
  "failed",
]);

// --- Tablas ---

// 1:1 con auth.users de Supabase (mismo id que el usuario autenticado).
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(), // = auth.users.id
  role: userRole("role").notNull(),
  displayName: text("display_name").notNull(),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  city: text("city"),
  // porteros: años jugando de portero. Jugadores: sin uso.
  experienceYears: integer("experience_years"),
  // porteros: nivel al que juegan. Equipos: nivel habitual de sus partidos.
  level: text("level"),
  baseLat: doublePrecision("base_lat"),
  baseLng: doublePrecision("base_lng"),
  // solo aplica a porteros: se activa tras revisión manual del admin.
  approved: boolean("approved").notNull().default(false),
  // acceso al panel /admin — se setea a mano en la DB, nunca desde el cliente.
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const teams = pgTable("teams", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const teamMembers = pgTable(
  "team_members",
  {
    teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    joinedAt: timestamp("joined_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.teamId, t.profileId] })],
);

export const matches = pgTable("matches", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  teamId: uuid("team_id").references(() => teams.id, { onDelete: "set null" }),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  address: text("address"),
  level: text("level"),
  budgetSuggested: numeric("budget_suggested", { precision: 10, scale: 2 }),
  status: matchStatus("status").notNull().default("open"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const applications = pgTable(
  "applications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    matchId: uuid("match_id")
      .notNull()
      .references(() => matches.id, { onDelete: "cascade" }),
    goalkeeperId: uuid("goalkeeper_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    rate: numeric("rate", { precision: 10, scale: 2 }).notNull(),
    message: text("message"),
    status: applicationStatus("status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    // un portero solo puede aplicar una vez por partido.
    uniqueIndex("applications_match_goalkeeper_uq").on(
      t.matchId,
      t.goalkeeperId,
    ),
  ],
);

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchId: uuid("match_id")
    .notNull()
    .unique()
    .references(() => matches.id, { onDelete: "cascade" }),
  applicationId: uuid("application_id")
    .notNull()
    .references(() => applications.id, { onDelete: "restrict" }),
  playerId: uuid("player_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "restrict" }),
  goalkeeperId: uuid("goalkeeper_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "restrict" }),
  rate: numeric("rate", { precision: 10, scale: 2 }).notNull(),
  commissionPct: numeric("commission_pct", { precision: 5, scale: 2 })
    .notNull()
    .default("15.00"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  paymentStatus: paymentStatus("payment_status").notNull().default("held"),
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id")
    .notNull()
    .unique()
    .references(() => bookings.id, { onDelete: "cascade" }),
  reviewerId: uuid("reviewer_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  goalkeeperId: uuid("goalkeeper_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(), // 1-5, validar en la capa de app
  comment: text("comment"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchId: uuid("match_id")
    .notNull()
    .references(() => matches.id, { onDelete: "cascade" }),
  senderId: uuid("sender_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const strikes = pgTable("strikes", {
  id: uuid("id").primaryKey().defaultRandom(),
  goalkeeperId: uuid("goalkeeper_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  bookingId: uuid("booking_id").references(() => bookings.id, {
    onDelete: "set null",
  }),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
