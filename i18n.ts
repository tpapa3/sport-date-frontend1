
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import axios from "axios";
import languageFallbacks from './app/locales/languageFallbacks'


const isProductionCode = false;

const projectToken = "f3b8535140ce4d38a3d9528b65faa5b9"; 
const apiKey = "9d983dc7f195A998C0260F366082916601Bb99C96Fa32dc6"; 

const apiBaseUrl = "https://api.simplelocalize.io/api";
const cdnBaseUrl = "https://cdn.simplelocalize.io";
const environment = "_latest"; 
const loadPathWithNamespaces =  `${cdnBaseUrl}/${projectToken}/${environment}/{{lng}}/{{ns}}`;

const configuration = {
    headers: {
        'X-SimpleLocalize-Token': apiKey
    }
};

interface languagePropKey{
   translationKeys:languageKeyNs[]
}

interface languageKeyNs{
    key:string;
    namespace:string;
}

interface languagePropUpdate{
    translations:languageUpdateTranslation[]
}

interface languageUpdateTranslation extends languageKeyNs{
   language:string;
   text:string;
}

interface languageTranslation {
   translationKey:string;
   namespace:string;
   language:string;
   fallbackValue:string;
}

const createTranslationKeys = async (requestBody: languagePropKey) => axios.post(`${apiBaseUrl}/v1/translation-keys/bulk`, requestBody, configuration)
const updateTranslations = async (requestBody: languagePropUpdate) => axios.patch(`${apiBaseUrl}/v2/translations/bulk`, requestBody, configuration)

const missing: languageTranslation[] = [];
const saveMissing = async () => {
   
    if (missing.length === 0 || isProductionCode) {
        return;
    }

    const translationKeys = missing.map((element) => ({
        key: element.translationKey,
        namespace: element.namespace,
    }));

    await createTranslationKeys({translationKeys})
        .catch((error) => console.error(`Error during creating translation keys: ${error}`));

    const translations = missing.map((element) => ({
        key: element.translationKey,
        namespace: element.namespace,
        language: element.language,
        text: element.fallbackValue,
    }));
    await updateTranslations({translations})
        .catch((error) => console.error(`Error during updating translations: ${error}`));
    missing.length = 0;
}

setInterval(async () => {
    await saveMissing();
}, 30_000); 


i18n
  .use(Backend)
  .use(new LanguageDetector(null, {
    order: ['navigator', 'cookie', 'localStorage'],
    caches: ['localStorage'],
    lookupLocalStorage: 'i18nextLng',
    convertDetectedLanguage: (lng) => lng.replace('-', '_'), 
  }))
  .use (initReactI18next)
  .init({
    fallbackLng:(code) => {
      if(code == 'el_GR') {return 'el_GR'}
      else {return 'en'}
    },
    backend: {
      loadPath: loadPathWithNamespaces
    },
    saveMissing: !isProductionCode,
    detection: {
        order: ['navigator', 'cookie', 'localStorage', 'querystring', 'htmlTag'],
        caches: [] // Disable caching if you always want fresh detection
    },
    missingKeyHandler: async (languages, namespace, translationKey, fallbackValue) => {
        
        const langCode=languages[0].split('_')[0];
        const langValue = languageFallbacks[langCode]?.[translationKey] || fallbackValue
        const entry = { translationKey, namespace: 'translation', language: languages[0], fallbackValue:langValue };
        if (!missing.some(m => m.translationKey === entry.translationKey && m.namespace === entry.namespace)) {
            missing.push(entry);
          }
       
    }
  })

export default i18n;