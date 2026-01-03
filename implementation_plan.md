# Localization Fixes for Health Education and Myths vs Facts

## Goal Description
Fix localization issues where:
1.  **Health Education**: Middle three cards (Mental Health, First Aid, Lifestyle) remain in English when Marathi is selected.
2.  **Myths vs Facts**: For non-English/Hindi languages, the bottom content of new cards (items 6-15) shows Hindi text instead of the selected language.

## User Review Required
> [!IMPORTANT]
> The fix for "Myths vs Facts" involves overwriting the `*Hi` keys (e.g., `mythHi`, `factHi`) with the local language text (`myth`, `fact`) for items 6-15 in translation files (Marathi, Telugu, Tamil, Punjabi, Bengali, Odia). This assumes the intended behavior is to show the local language fully, mirroring the behavior of items 1-5 in those files.

## Proposed Changes
### Health Education (Marathi)
-   **Modify**: `public/locales/mr/translation.json`
    -   Add missing `education.items` keys: `mentalHealth`, `firstAid`, `lifestyle`.
    -   Provide Marathi translations.

### Myths vs Facts (All non-En/Hi languages)
-   **Target Files**: 
    -   `public/locales/mr/translation.json`
    -   `public/locales/te/translation.json`
    -   `public/locales/ta/translation.json`
    -   `public/locales/pa/translation.json`
    -   `public/locales/bn/translation.json`
    -   `public/locales/or/translation.json`
-   **Change**:
    -   For `misconceptions.items` IDs 6-15, set `mythHi` = `myth`, `factHi` = `fact`, `tipHi` = `tip`.

## Verification Plan
### Manual Verification
-   Switch to Marathi: Check "Mental Health", "First Aid", "Lifestyle" cards.
-   Check "Myths vs Facts" (e.g. Card 6 "Papaya") in Marathi and Telugu to ensure bottom text is not Hindi.
