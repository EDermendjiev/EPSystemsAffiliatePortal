require("fs").writeFileSync("src/i18n/translations.ts",require("fs").readFileSync("src/i18n/gen.txt","utf8"))
