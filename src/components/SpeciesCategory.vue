<template>
<b-container fluid class="h-100 bg-light overflow-auto" id="specieslist">
  <b-row class="h-100">
    <b-col class="h-100 col-xs-12 md-6 col-lg-6 d-flex flex-column py-2">
       <b-card v-if="category.name">
         <b-card-body>
            <h3> {{ category.name }} ({{ category_list.length }})</h3>
           <b-table id="species_table"
             hover             
             responsive
             :fields="[
               { key: 'family', label: 'Familia', sortable: true },
               { key: 'scientific_name', label: 'Nombre cientifico', sortable: true },
               { key: 'common_name', label: 'Nombre en inglés', sortable: true },
               { key: 'notes', label: 'Nota', sortable: true },
             ]"
             :items="category_list"
             :tbody-tr-class="rowClass"
           >
             <template #cell(seen)="sp">
                 <b-icon icon="square" />
             </template>
             <template #cell(common_name)="sp">
               <b-link
                 :href="sp.item.species_code + '/EC'" 
                target="_blank"
              >
                {{ sp.value }}
              </b-link>
            </template>
             <template #cell(lifelist)="sp">
              <b-link v-if="sp.item.seen"
                 :href="'https://ebird.org/lifelist?time=life&spp=' + sp.item.species_code " 
                target="_blank">
                My Lists
              </b-link>
            </template>
          </b-table>
        </b-card-body>
      </b-card>
      <b-card fluid class="h-100 bg-light" v-if="!category.name">
        Por favor, seleccione una categoría.<br /><br />

        Los datos provienen de la <a href="https://avesconservacion.org/wp-content/uploads/2021/11/1-LR-lista_roja_avesEC.pdf" target="_blank">lista roja de las aves del Ecuador de 2019</a>.
      </b-card>
    </b-col>
  </b-row>
</b-container>
</template>
<script setup>
import { eventBus } from "../main";
import species_list from "../assets/species_list.json";
</script>

<script>
export default {
  data() {
    return {
      species_list: species_list,
      category_list: [],
      user_species: [],
    }
  },
  props: ['category'],
  methods: {
    species_list_table() {
        this.category_list = this.species_list
          .filter((s) => s.category.includes(this.category.code));
    },
    rowClass(item, type) {
      if (item && type === 'row') {
        if (item.seen === true) {
          return 'table-active'
        } else {
          return 'not-checked-species'
        } 
      } else {
        return null
      }
    }
  },
  created: function() {
    eventBus.$on("userdata-changed", (data) => {
      this.user_species = data.species;
      this.species_list_table();
    });
  },
  watch: { 
    category: function(newVal, oldVal) { // watch it
      this.species_list_table();
    }
  }
};


</script>