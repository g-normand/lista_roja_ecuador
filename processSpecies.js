import csvtojson from "csvtojson";
import fs from "fs";

const sp = await csvtojson.csv().fromFile("data/species_list.csv")


const sp_category = sp.map(s => {
    return {
        family:s.family,
        common_name: s.common_name,
        species_code: s.species_code,
        scientific_name: s.scientific_name,
        category: s.category,
        notes:s.notes,
        ebird_picture:s.ebird_picture,
        iucn_status: s.IUCN_status,
    }
})


await fs.writeFileSync('src/assets/species_list.json', JSON.stringify(sp_category));