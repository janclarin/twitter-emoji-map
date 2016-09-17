'use strict';

var express = require('express'),
    Twit = require('twit'),
    T = new Twit({
        consumer_key: 'OWNF0XVSAHcpV6wu34anznHmZ',
        consumer_secret: '8YgxkKiWojAKw8EzMJWNTh6vgp6NNQQM3j9arCmTgL0dJPTKPB',
        access_token: '3051484454-RMKxOEgQGVX2P1jL2QNw8AU1bWhm4Ao3nTtqQ3V',
        access_token_secret: 'iJDsw85bJOEEhJuwQyHZh0jeHpl4jA3ECSpQfdO4CRJSu',
        timeout_ms: 60 * 1000
    }),
    router = express.Router(),
    countries = {
        "AF": { name: "Afghanistan" },
        "AX": { name: "Åland Islands" },
        "AL": { name: "Albania" },
        "DZ": { name: "Algeria" },
        "AS": { name: "American Samoa" },
        "AD": { name: "Andorra" },
        "AO": { name: "Angola" },
        "AI": { name: "Anguilla" },
        "AQ": { name: "Antarctica" },
        "AG": { name: "Antigua and Barbuda" },
        "AR": { name: "Argentina" },
        "AM": { name: "Armenia" },
        "AW": { name: "Aruba" },
        "AU": { name: "Australia" },
        "AT": { name: "Austria" },
        "AZ": { name: "Azerbaijan" },
        "BS": { name: "Bahamas" },
        "BH": { name: "Bahrain" },
        "BD": { name: "Bangladesh" },
        "BB": { name: "Barbados" },
        "BY": { name: "Belarus" },
        "BE": { name: "Belgium" },
        "BZ": { name: "Belize" },
        "BJ": { name: "Benin" },
        "BM": { name: "Bermuda" },
        "BT": { name: "Bhutan" },
        "BO": { name: "Bolivia" },
        "BA": { name: "Bosnia and Herzegovina" },
        "BW": { name: "Botswana" },
        "BV": { name: "Bouvet Island" },
        "BR": { name: "Brazil" },
        "IO": { name: "British Indian Ocean Territory" },
        "BN": { name: "Brunei Darussalam" },
        "BG": { name: "Bulgaria" },
        "BF": { name: "Burkina Faso" },
        "BI": { name: "Burundi" },
        "KH": { name: "Cambodia" },
        "CM": { name: "Cameroon" },
        "CA": { name: "Canada" },
        "CV": { name: "Cape Verde" },
        "KY": { name: "Cayman Islands" },
        "CF": { name: "Central African Republic" },
        "TD": { name: "Chad" },
        "CL": { name: "Chile" },
        "CN": { name: "China" },
        "CX": { name: "Christmas Island" },
        "CC": { name: "Cocos (Keeling) Islands" },
        "CO": { name: "Colombia" },
        "KM": { name: "Comoros" },
        "CG": { name: "Congo" },
        "CD": { name: "Congo, The Democratic Republic of the" },
        "CK": { name: "Cook Islands" },
        "CR": { name: "Costa Rica" },
        "CI": { name: "Cote D'Ivoire" },
        "HR": { name: "Croatia" },
        "CU": { name: "Cuba" },
        "CY": { name: "Cyprus" },
        "CZ": { name: "Czech Republic" },
        "DK": { name: "Denmark" },
        "DJ": { name: "Djibouti" },
        "DM": { name: "Dominica" },
        "DO": { name: "Dominican Republic" },
        "EC": { name: "Ecuador" },
        "EG": { name: "Egypt" },
        "SV": { name: "El Salvador" },
        "GQ": { name: "Equatorial Guinea" },
        "ER": { name: "Eritrea" },
        "EE": { name: "Estonia" },
        "ET": { name: "Ethiopia" },
        "FK": { name: "Falkland Islands (Malvinas)" },
        "FO": { name: "Faroe Islands" },
        "FJ": { name: "Fiji" },
        "FI": { name: "Finland" },
        "FR": { name: "France" },
        "GF": { name: "French Guiana" },
        "PF": { name: "French Polynesia" },
        "TF": { name: "French Southern Territories" },
        "GA": { name: "Gabon" },
        "GM": { name: "Gambia" },
        "GE": { name: "Georgia" },
        "DE": { name: "Germany" },
        "GH": { name: "Ghana" },
        "GI": { name: "Gibraltar" },
        "GR": { name: "Greece" },
        "GL": { name: "Greenland" },
        "GD": { name: "Grenada" },
        "GP": { name: "Guadeloupe" },
        "GU": { name: "Guam" },
        "GT": { name: "Guatemala" },
        "GG": { name: "Guernsey" },
        "GN": { name: "Guinea" },
        "GW": { name: "Guinea-Bissau" },
        "GY": { name: "Guyana" },
        "HT": { name: "Haiti" },
        "HM": { name: "Heard Island and Mcdonald Islands" },
        "VA": { name: "Holy See (Vatican City State)" },
        "HN": { name: "Honduras" },
        "HK": { name: "Hong Kong" },
        "HU": { name: "Hungary" },
        "IS": { name: "Iceland" },
        "IN": { name: "India" },
        "ID": { name: "Indonesia" },
        "IR": { name: "Iran, Islamic Republic Of" },
        "IQ": { name: "Iraq" },
        "IE": { name: "Ireland" },
        "IM": { name: "Isle of Man" },
        "IL": { name: "Israel" },
        "IT": { name: "Italy" },
        "JM": { name: "Jamaica" },
        "JP": { name: "Japan" },
        "JE": { name: "Jersey" },
        "JO": { name: "Jordan" },
        "KZ": { name: "Kazakhstan" },
        "KE": { name: "Kenya" },
        "KI": { name: "Kiribati" },
        "KP": { name: "Democratic People's Republic of Korea" },
        "KR": { name: "Korea, Republic of" },
        "XK": { name: "Kosovo" },
        "KW": { name: "Kuwait" },
        "KG": { name: "Kyrgyzstan" },
        "LA": { name: "Lao People's Democratic Republic" },
        "LV": { name: "Latvia" },
        "LB": { name: "Lebanon" },
        "LS": { name: "Lesotho" },
        "LR": { name: "Liberia" },
        "LY": { name: "Libyan Arab Jamahiriya" },
        "LI": { name: "Liechtenstein" },
        "LT": { name: "Lithuania" },
        "LU": { name: "Luxembourg" },
        "MO": { name: "Macao" },
        "MK": { name: "Macedonia, The Former Yugoslav Republic of" },
        "MG": { name: "Madagascar" },
        "MW": { name: "Malawi" },
        "MY": { name: "Malaysia" },
        "MV": { name: "Maldives" },
        "ML": { name: "Mali" },
        "MT": { name: "Malta" },
        "MH": { name: "Marshall Islands" },
        "MQ": { name: "Martinique" },
        "MR": { name: "Mauritania" },
        "MU": { name: "Mauritius" },
        "YT": { name: "Mayotte" },
        "MX": { name: "Mexico" },
        "FM": { name: "Micronesia, Federated States of" },
        "MD": { name: "Moldova, Republic of" },
        "MC": { name: "Monaco" },
        "MN": { name: "Mongolia" },
        "ME": { name: "Montenegro" },
        "MS": { name: "Montserrat" },
        "MA": { name: "Morocco" },
        "MZ": { name: "Mozambique" },
        "MM": { name: "Myanmar" },
        "NA": { name: "Namibia" },
        "NR": { name: "Nauru" },
        "NP": { name: "Nepal" },
        "NL": { name: "Netherlands" },
        "AN": { name: "Netherlands Antilles" },
        "NC": { name: "New Caledonia" },
        "NZ": { name: "New Zealand" },
        "NI": { name: "Nicaragua" },
        "NE": { name: "Niger" },
        "NG": { name: "Nigeria" },
        "NU": { name: "Niue" },
        "NF": { name: "Norfolk Island" },
        "MP": { name: "Northern Mariana Islands" },
        "NO": { name: "Norway" },
        "OM": { name: "Oman" },
        "PK": { name: "Pakistan" },
        "PW": { name: "Palau" },
        "PS": { name: "Palestinian Territory, Occupied" },
        "PA": { name: "Panama" },
        "PG": { name: "Papua New Guinea" },
        "PY": { name: "Paraguay" },
        "PE": { name: "Peru" },
        "PH": { name: "Philippines" },
        "PN": { name: "Pitcairn" },
        "PL": { name: "Poland" },
        "PT": { name: "Portugal" },
        "PR": { name: "Puerto Rico" },
        "QA": { name: "Qatar" },
        "RE": { name: "Reunion" },
        "RO": { name: "Romania" },
        "RU": { name: "Russian Federation" },
        "RW": { name: "Rwanda" },
        "SH": { name: "Saint Helena" },
        "KN": { name: "Saint Kitts and Nevis" },
        "LC": { name: "Saint Lucia" },
        "PM": { name: "Saint Pierre and Miquelon" },
        "VC": { name: "Saint Vincent and the Grenadines" },
        "WS": { name: "Samoa" },
        "SM": { name: "San Marino" },
        "ST": { name: "Sao Tome and Principe" },
        "SA": { name: "Saudi Arabia" },
        "SN": { name: "Senegal" },
        "RS": { name: "Serbia" },
        "SC": { name: "Seychelles" },
        "SL": { name: "Sierra Leone" },
        "SG": { name: "Singapore" },
        "SK": { name: "Slovakia" },
        "SI": { name: "Slovenia" },
        "SB": { name: "Solomon Islands" },
        "SO": { name: "Somalia" },
        "ZA": { name: "South Africa" },
        "GS": { name: "South Georgia and the South Sandwich Islands" },
        "ES": { name: "Spain" },
        "LK": { name: "Sri Lanka" },
        "SD": { name: "Sudan" },
        "SR": { name: "Suriname" },
        "SJ": { name: "Svalbard and Jan Mayen" },
        "SZ": { name: "Swaziland" },
        "SE": { name: "Sweden" },
        "CH": { name: "Switzerland" },
        "SY": { name: "Syrian Arab Republic" },
        "TW": { name: "Taiwan" },
        "TJ": { name: "Tajikistan" },
        "TZ": { name: "Tanzania, United Republic of" },
        "TH": { name: "Thailand" },
        "TL": { name: "Timor-Leste" },
        "TG": { name: "Togo" },
        "TK": { name: "Tokelau" },
        "TO": { name: "Tonga" },
        "TT": { name: "Trinidad and Tobago" },
        "TN": { name: "Tunisia" },
        "TR": { name: "Turkey" },
        "TM": { name: "Turkmenistan" },
        "TC": { name: "Turks and Caicos Islands" },
        "TV": { name: "Tuvalu" },
        "UG": { name: "Uganda" },
        "UA": { name: "Ukraine" },
        "AE": { name: "United Arab Emirates" },
        "GB": { name: "United Kingdom" },
        "US": { name: "United States" },
        "UM": { name: "United States Minor Outlying Islands" },
        "UY": { name: "Uruguay" },
        "UZ": { name: "Uzbekistan" },
        "VU": { name: "Vanuatu" },
        "VE": { name: "Venezuela" },
        "VN": { name: "Viet Nam" },
        "VG": { name: "Virgin Islands, British" },
        "VI": { name: "Virgin Islands, U.S." },
        "WF": { name: "Wallis and Futuna" },
        "EH": { name: "Western Sahara" },
        "YE": { name: "Yemen" },
        "ZM": { name: "Zambia" },
        "ZW": { name: "Zimbabwe" }
    };

var emojis = '😀,😬,😁,😂,😃,😄,😅,😆,😇,😉,😊,🙂,🙃,☺️,😋,😌,😍,😘,😗,😙,😚,😜,😝,😛,🤑,🤓,😎,🤗,😏,😶,😐,😑,😒,🙄,🤔,😳,😞,😟,😠,😡,😔,😕,🙁,☹️,😣,😖,😫,😩,😤,😮,😱,😨,😰,😯,😦,😧,😢,😥,😪,😓,😭,😵,🤐,😷,🤒,🤕,😴,💩,😈,👿,😺,😸,😹,😻,😼,😽,🙀,😿,😾';
var emojiArray = emojis.split(',');

var stream = T.stream('statuses/filter', {
    track: emojis
});

stream.on('tweet', updateCountries);

router.get('/', getCountries);

function getCountries(req, res) {
    res.json(countries);
}

/**
 * Updates the countries object with info about seen emojis and popular
 * @param tweet json response from Twitter.
 */
function updateCountries(tweet) {
    // Only update if the tweet was geographic data.
    if (tweet.place) {
        var countryCode = tweet.place.country_code;

        // Get an object with the number of each emoji in the tweet.
        var emojiOccurrences = getEmojiOccurrences(tweet.text);

        var countryInfo = countries[countryCode];
        if (!countryInfo.hasOwnProperty('emojiOccurrences')) {
            countryInfo.emojiOccurrences = {};
        }

        if (!countryInfo.hasOwnProperty('mostPopularEmoji')) {
            countryInfo.mostPopularEmoji = '';
        }

        if (!countryInfo.hasOwnProperty('mostEmojiOccurrences')) {
            countryInfo.mostEmojiOccurrences = 0;
        }

        for (var emoji in emojiOccurrences) {
            // Add the number of occurrences for the emoji if seen before.
            if (countryInfo.emojiOccurrences[emoji]) {
                countryInfo.emojiOccurrences[emoji] += emojiOccurrences[emoji];
            } else {
                countryInfo.emojiOccurrences[emoji] = emojiOccurrences[emoji];
            }

            // Update most popular emoji count.
            if (countryInfo.emojiOccurrences[emoji] > countryInfo.mostEmojiOccurrences) {
                countryInfo.mostPopularEmoji = emoji;
                countryInfo.mostEmojiOccurrences = countryInfo.emojiOccurrences[emoji];
            }
        }
    }
}

/**
 * Creates an object that keep track of the number of occurrences
 * of a specific emoji. { emoji: numOccurrences, ... }
 * @param text Text that might contain emojis.
 * @returns {{}}
 */
function getEmojiOccurrences(text) {
    var emojiOccurrences = {};
    if (text) {
        // Each emoji consists of two characters.
        for (var i = 1; i < text.length; i += 2) {
            var char = text[i - 1] + text[i];
            if (isEmoji(char)) {
                if (emojiOccurrences[char]) {
                    emojiOccurrences[char]++;
                } else {
                    emojiOccurrences[char] = 1;
                }
            }
        }
    }
    return emojiOccurrences;
}

/**
 * Checks if the string is an emoji from the emoji array.
 * @param string
 * @returns {boolean}
 */
function isEmoji(string) {
    return emojiArray.indexOf(string) > -1;
}

module.exports = router;
