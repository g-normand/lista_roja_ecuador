# lista roja ecuador

List of the endangered bird species in Ecuador, according to the 2019 list.
(source : https://avesconservacion.org/wp-content/uploads/2021/11/1-LR-lista_roja_avesEC.pdf )

Inspired by <a href="https://github.com/Zoziologie">Zoziologie</a> web apps :)

# Installation

```
git clone git@github.com:g-normand/lista_roja_ecuador.git
cd list_roja_ecuador
npm install

FOR DEV:
npm run dev

FOR PROD:
npm run build
scp -r dist/* guiguide@ssh-guiguide.alwaysdata.net:/home/guiguide/www/lista_roja_ecuador/
```

With new species:
```
Add species in species_list.csv
npm run processSpecies
```
