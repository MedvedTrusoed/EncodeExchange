import { encoded, translations } from "./data.js";

console.log("Let's rock");

let decoderArray = [];
let decoder = {};

function decode(encode, translation) {
  encode.forEach((encodeObject) => {
    let regular = /Id/;

    let encodeKeysArr = Object.keys(encodeObject);
    let keyWithRegular;

    let idOnlyKey = "";

    encodeKeysArr.forEach((encodeKey) => {
       
      decoder[encodeKey] = encodeObject[encodeKey];

        // расшифровка полей с суффиксом id
      keyWithRegular = encodeKey.match(regular);

      if (keyWithRegular !== null && typeof keyWithRegular !== "undefined") {
        if (keyWithRegular.input !== "groupId") {
          idOnlyKey = keyWithRegular.input;
          if (
            encodeObject[encodeKey] !== null &&
            typeof encodeObject[encodeKey] !== "undefined"
          ) {
            decoder[idOnlyKey] = translation[encodeObject[encodeKey]];
          }
        } else {
          decoder[keyWithRegular.input] = encodeObject[encodeKey];
        }
      }
    });
    decoderArray.push(decoder);
    decoder = {};
  });
}
decode(encoded, translations);

console.log(decoderArray);


//список уникальных id, из _encoded_

let countIds = {};
let uniqIds = [];


function getUniqIds(encoded){
    for (var i = 0; i < encoded.length; i++) {
        let encodeVal = Object.values(encoded[i]);

        //Подсчет количества каждого числового значения id
        encodeVal.forEach((elem) => {
          if (elem !== null && typeof elem !== "undefined") {
            if (parseInt(elem) || elem == 0) {
              if (elem in countIds) {
                countIds[elem] += 1;
              } else {
                countIds[elem] = 1;
              }
            }
          }
        });
      }

      //Запись уникальных значений в массив
for (let key in countIds) {
    if (countIds[key] == 1) {
      uniqIds.push(key);
    }
  }
}



getUniqIds(encoded);

console.log(uniqIds);
