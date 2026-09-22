# UK survey draft (London pilot)

Draft copy for the 3 Google Forms of the London validation phase, adapted from
the Belgium ones (see `research/surveys.md` for the original). These are **not
live forms yet** — create them in Google Forms from this draft, then paste the
real `viewform` links into `lib/site.ts` (`FORMS.teams`, `FORMS.goalkeepers`,
`FORMS.goalkeeperRegistration`).

Changes vs. the Belgium version:
- Currency in £ instead of €.
- City checkboxes updated to London + nearby/other major UK cities.
- Single language (English only) — no NL/FR branches needed for UK.
- Same GDPR-conscious consent language (UK GDPR + Data Protection Act 2018
  still requires this, Brexit didn't remove it).
- Carried over the fixes already applied to the Belgium forms (no copy-pasted
  opening question, radio buttons for mutually-exclusive frequency question,
  open "Other" price option, consent checkbox on the registration form).

---

## 1. Goalkeeper Market Research — "🥅 Goalkeepers Wanted - Quick Survey"

Intro: *"We are studying the interest of football goalkeepers in occasional
paid matches. This survey takes less than 1 minute."*

Questions:

1. Where do you usually play football? *(checkbox)* — London / Manchester / Birmingham / Leeds / Bristol / Glasgow / Other
2. Do you regularly play as a goalkeeper? — Yes / Sometimes / Never
3. Would you be interested in earning extra money by playing occasional matches? — Yes / No / Maybe
4. What would be a fair payment for one match? — £15 / £20 / £25 / £30 / Other (free text)
5. How much notice would you need? *(checkbox)* — Same day / 24 hours / 2-3 days / One week or more
6. How far would you be willing to travel? — Up to 5 miles / Up to 10 miles / Up to 20 miles / More than 20 miles
7. What would motivate you most? *(checkbox)* — Extra income / Playing more football / Meeting new people / Staying active
8. Would you like to be contacted if the project moves forward? — Yes / No
9. E-mail or WhatsApp (Optional, described as "only used to contact you about this project. Not shared with third parties.") — free text

---

## 2. Teams Market Research — "⚽ Need a goalkeeper for your match? – Quick Survey"

Intro: *"We're exploring whether teams and casual groups would use a service
to find a goalkeeper, whether yours cancels last minute or your matches never
had a fixed one. Takes less than 1 minute."*

Questions:

1. Where do you usually play football? *(checkbox)* — London / Manchester / Birmingham / Leeds / Bristol / Glasgow / Other
2. What type of football do you usually play? *(checkbox)* — With Friends / Amateur league / 5-a-side league / Corporate football / Tournaments / Other
3. How often does your team struggle to find a goalkeeper? *(radio, mutually exclusive)* — Never / Every month / Almost every week
4. What do you usually do when your goalkeeper is unavailable? *(checkbox)* — Someone else goes in goal / We ask friends / We ask in WhatsApp/Facebook groups / We cancel the game
5. If a reliable goalkeeper could be found for your match, would you consider paying for a service that provides these goalkeepers? — Yes / No / Depends on price
6. How much would your team be willing to pay for a goalkeeper? — £15–25 / £25–35 / Other (free text)
7. Would you like to be informed if such a service becomes available? — Yes / No / Maybe
8. E-mail or WhatsApp (Optional, same "not shared with third parties" note) — free text

---

## 3. Goalkeeper Registration — "🥅 Join the Goalkeeper Network"

Intro: *"We're building a list of available goalkeepers for teams and casual
groups in London who need one for a match. This is an early research project,
no matching service exists yet. Your name, phone and email are only used to
contact you about this project; we won't share your data with third
parties."*

Questions:

1. Full Name — free text
2. Mobile Number (WhatsApp preferred) — free text
3. Email Address — free text
4. City — free text
5. What football formats do you play? *(checkbox)* — 5v5 / 6v6 / 7v7 / 8v8 / 11v11
6. Usual availability — Weekdays / Weekends / Both
7. Minimum fee per match — £20 / £25 / £30 / Other (free text)
8. Can you accept last-minute matches (less than 24 hours notice)? — Yes / No
9. Additional comments — free text
10. **Consent** *(required)* — checkbox: "I agree that my name, phone number
    and email may be stored and used to contact me about goalkeeper
    opportunities for this project. I understand my data won't be shared with
    third parties."

---

## Open questions before creating the forms

- Confirm price ranges (£15–30 for keepers, £15–35 for teams) feel right for
  London — these were carried over proportionally from the Belgium (€) ranges,
  not independently researched for the UK market.
- Decide whether to add a "How did you hear about this?" channel-attribution
  question now that outreach restarts from scratch in a new market (was
  deprioritized for Belgium, may be worth revisiting here).
