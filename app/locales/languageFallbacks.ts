interface TranslationMap {
    [key: string]: string; 
}


interface LanguageFallbacks {
    [lang: string]: TranslationMap; 
}

const languageFallbacks : LanguageFallbacks = {
    'el': {
        'January': 'Iανουάριος',
        'February': 'Φεβρουάριος',
        'March': 'Μάρτιος',
        'April': 'Απρίλιος',
        'May': 'Μάιος',
        'June': 'Ιούνιος',
        'July': 'Ιούλιος',
        'August': 'Αύγουστος',
        'September': 'Σεπτέμβριος',
        'October': 'Οκτώβριος',
        'November': 'Νοέμβριος',
        'December': 'Δεκέμβριος',
        'Town':'Πόλη',
        'Sport':'sport',
        'Stadium':'Γήπεδο',
        'Coach':'Προπονητής',
        "Choose":'Διαλεγω'
        
    }
}

export default languageFallbacks;