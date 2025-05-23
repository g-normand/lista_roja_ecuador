<template>
<b-container fluid class="h-100 bg-light overflow-auto" id="specieslist">
  <b-row class="h-100">
    <b-col class="h-100 col-xs-12 md-9 col-lg-9 d-flex flex-column py-2">
       <b-card v-if="category.name">
         <b-card-body>
            <h3> {{ category.name }} ({{ category_list.length }})</h3>
           <b-table id="species_table"
             hover             
             responsive
             :fields="[
               { key: 'family', label: 'Familia', sortable: true },
               { key: 'picture', label: 'Imagen', sortable: false },
               { key: 'scientific_name', label: 'Nombre cientifico', sortable: true },
               { key: 'common_name', label: 'Nombre en inglés', sortable: true },
               { key: 'notes', label: 'Nota', sortable: true },
               { key: 'iucn_status', label: 'IUCN Status', sortable: true },
             ]"
             :items="category_list"
             :per-page="perPage"
             :current-page="currentPage"
           >
             <template #cell(picture)="sp">
                <iframe  v-if="sp.item.ebird_picture && showIframes" :src="sp.item.ebird_picture + '/embed'" height="332" width="320" frameborder="0" allowfullscreen></iframe> 
            </template>
             <template #cell(common_name)="sp">
               <b-link
                 :href="sp.item.species_code + '/EC'" 
                target="_blank"
              >
                {{ sp.value }}
              </b-link>
            </template>
             <template #cell(iucn_status)="sp">
              <span v-if="sp.item.iucn_status == 'IUCN_LC'" class="ebirdBadge u-inline-xs u-color-constatus-lc">
                <span class="Badge-label">LC</span>
              </span>
              <span v-if="sp.item.iucn_status == 'IUCN_NT'" class="ebirdBadge u-inline-xs u-color-constatus-nt">
                <span class="Badge-label">NT</span>
              </span>
              <span v-if="sp.item.iucn_status == 'IUCN_VU'" class="ebirdBadge u-inline-xs u-color-constatus-vu">
                <span class="Badge-label">VU</span>
              </span>
              <span v-if="sp.item.iucn_status == 'IUCN_EN'" class="ebirdBadge u-inline-xs u-color-constatus-en">
                <span class="Badge-label">EN</span>
              </span>
              <span v-if="sp.item.iucn_status == 'IUCN_CR'" class="ebirdBadge u-inline-xs u-color-constatus-cr">
                <span class="Badge-label">CR</span>
              </span>
              <span v-if="sp.item.iucn_status == 'IUCN_EX'" class="ebirdBadge u-inline-xs u-color-constatus-ex">
                <span class="Badge-label">EX</span>
              </span>
              <span v-if="sp.item.iucn_status == 'IUCN_EW'" class="ebirdBadge u-inline-xs u-color-constatus-ew">
                <span class="Badge-label">EW</span>
              </span>
              <span v-if="sp.item.iucn_status == 'IUCN_DD'" class="ebirdBadge u-inline-xs u-color-constatus-dd">
                <span class="Badge-label">DD</span>
              </span>
              <span v-if="sp.item.iucn_status == 'IUCN_NE'" class="ebirdBadge u-inline-xs u-color-constatus-ne">
                <span class="Badge-label">NE</span>
              </span>
            </template>
          </b-table>
           <b-pagination
              v-if="category_list.length > 15"
              v-model="currentPage"
              :total-rows="category_list.length"
              :per-page="perPage"
              align="center"
              class="my-2"
            />
        </b-card-body>
      </b-card>
      <b-card fluid class="h-100 bg-light" v-if="!category.name">
        <h3>Lista roja de las aves del Ecuador</h3>
        Por favor, seleccione una categoría.<br />
        <b-button squared v-b-toggle.sidebar-categories class="categories-button" v-show="show_categories_button">Ver categorías</b-button>
        <br />
        <br />
        <br />
        Los datos provienen de : <a href="https://avesconservacion.org/wp-content/uploads/2021/11/1-LR-lista_roja_avesEC.pdf" target="_blank"><img src="https://multimedia20stg.blob.core.windows.net/post/post1732post1732Lista%20roja-min.png" width="300px" /></a><br />
        y las fotos de la Macaulay Library. <br />
        No se incluyen especies de Preocupación Menor (LC) ni especies no evaluables (NE).
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
      currentPage: 1,
      perPage: 15,
      showIframes: true,  
      show_categories_button:false,
    }
  },
  props: ['category'],
  methods: {
    species_list_table() {
        this.category_list = this.species_list
          .filter((s) => s.category.includes(this.category.code));
        this.show_categories_button = false;
    }
  },
  created: function() {
    eventBus.$on("userdata-changed", (data) => {
      this.species_list_table();
    });
  },
  watch: { 
    category: function(newVal, oldVal) { // watch it
      this.currentPage = 1;
      this.species_list_table();
      this.showIframes = false;
      this.$nextTick(() => {
        this.showIframes = true;
      });
    },
    currentPage() {
      this.showIframes = false;
      this.$nextTick(() => {
        this.showIframes = true;
      });
    }
  },
  mounted: function () {   
    if (window.innerWidth < 760){
      this.show_categories_button = true;
    }
  },
};

</script>