# Implementation Plan - i18n Scalability & Pan-India Expansion

## Goal Description
Scale the i18n implementation to support 5 additional major Indian languages (Bengali, Telugu, Tamil, Odia, Punjabi), utilizing correct native scripts and ensuring UI robustness for variable text lengths.

## Proposed Changes

### Infrastructure
#### [MODIFY] [i18n.ts](file:///c:/College/hackathons/SehatSaathi/remote-well-reach/src/i18n.ts)
- Add `bn`, `te`, `ta`, `or`, `pa` to `supportedLngs`.

#### [MODIFY] [LanguageSwitcher.tsx](file:///c:/College/hackathons/SehatSaathi/remote-well-reach/src/components/LanguageSwitcher.tsx)
- Add new languages to the `languages` array with native labels:
    - Bengali: বাংলা
    - Telugu: తెలుగు
    - Tamil: தமிழ்
    - Odia: ଓଡ଼ିଆ
    - Punjabi: ਪੰਜਾਬੀ

### Translations
#### [NEW] Translation Files
- `public/locales/bn/translation.json`
- `public/locales/te/translation.json`
- `public/locales/ta/translation.json`
- `public/locales/or/translation.json`
- `public/locales/pa/translation.json`
- **Quality**: Empathetic, layman-friendly healthcare terminology.

### UI Hardening
#### [MODIFY] [Home.tsx](file:///c:/College/hackathons/SehatSaathi/remote-well-reach/src/pages/Home.tsx)
- Myth Cards: Ensure `min-height` or flexible layouts to handle text expansion (especially for South Indian scripts).

#### [MODIFY] [Education.tsx](file:///c:/College/hackathons/SehatSaathi/remote-well-reach/src/pages/Education.tsx)
- Topic Cards: Check for title/description overflow.

## Verification Plan
- **Automated**: Verify `i18n` initializes with new languages.
- **Manual**:
    - Switch to each new language.
    - Inspect "Myth" cards for layout breakage.
    - Inspect "Education" cards for layout breakage.
    - Verify Native Script rendering in the dropdown.
