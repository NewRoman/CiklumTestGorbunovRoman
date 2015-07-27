$(document).ready(function(){
  $('[type="number"]').stepper();

  showAllCategories();
  showAllProducts();

  //sorted product by category
  $('main').bind('click', function(event){
    var $active_category = $('[data-category-id].active')
    var $target = $(event.target);
    if ($target.attr('data-category-id')) {
      $("#sort_options [value='0']").attr("selected", "selected");//make selected element with value 0 - no selected mode
      $active_category.removeClass('active');
      event.preventDefault();
      $target.addClass('active');
      showProductsEachCategory($target.attr('data-category-id'));
    }    
  });  

  //Sort by modes
  $('#sort_options').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = parseInt(this.value);
    var active_category_id = $('[data-category-id].active').attr('data-category-id');
    if (!active_category_id) {

      switch (valueSelected) {
        case 0:
          showAllProducts();//sorted by none price
          break;
        case 1:
          sortAllProductsWithoutCategory(valueSelected);//sorted by ascending price
          break;
        case 2:
          sortAllProductsWithoutCategory(valueSelected);//sorted by descending price
          break;
        default:
          alert( 'Unknown sorted type');
      }
    } else {
      //sorting products from categories
      sortProductsEachCategory(active_category_id, valueSelected);
    }
  });

  //show list of categories
  function showAllCategories() {
    var $template = $('#handlebars-categories-template');

    $.getJSON("/data/categories.json", function(data) {
      var template = Handlebars.compile($template.html());
      $('#handlebars-categories-container').replaceWith(template(data))
    });
  }  

  //show all list of products
  function showAllProducts() {
    $.getJSON("/data/products.json", function(data) {
      generatingProdItem(data);
    });
  }

  //generate each product item
  function generatingProdItem(data) {
    var $template = $('#handlebars-list-template');
    var template = Handlebars.compile($template.html());
    $('#handlebars-list-container').replaceWith(template(data));    
    //show first foto of product
    showSingleImage();
    $('[type="number"]').stepper();
  }

  //show first foto of product
  function showSingleImage() {
    $.getJSON("/data/galleries.json", function(data) {
      arr_galleries = data.galleries;
      $images=$('[data-gallery-id]');
      for (var i = 0; i<arr_galleries.length; i++) {
        $images.each(function(indx, element){
          $element = $(element);
          if ($element.attr('data-gallery-id') == arr_galleries[i].id) {
            $element.attr('src', 'images/'+arr_galleries[i].id+'/'+arr_galleries[i].images[0]);
          }          
        });
      }        
    });    
  } 
  
  function showProductsEachCategory(category_id) {
    
    $.getJSON("/data/products.json", function(data) {
      
      var data_products = {"products":[]};//object with array of suitable products
      var arr_products = data.products;
      var counter = 0; 
      data_products.products.length == 0;
      for (var i = 0; i < arr_products.length; i++) {
        //make object with array of suitable products, need for handlebars.js
        if (category_id == arr_products[i].category_id) {
          data_products.products[counter]=arr_products[i];
          counter++;
        }       
      }
      generatingProdItem(data_products);
    });
  } 

  function sortAllProductsWithoutCategory(sorted_mode) {
    $.getJSON("/data/products.json", function(data) {
       switch (sorted_mode) {
        case 1:
          data.products.sort(function(obj1, obj2) {
            //sort array by ascending price
            return obj1.price-obj2.price;
          });

          generatingProdItem(data);
          break;
        case 2:
          data.products.sort(function(obj1, obj2) {
            //sort array by ascending price
            return obj2.price-obj1.price;
          });

          generatingProdItem(data);
          break;
        default:
          alert( 'Unknown sorted type');
      }     

    });
  }

  function sortProductsEachCategory(category_id, sorted_mode) {
    $.getJSON("/data/products.json", function(data) {
      
      var data_products = {"products":[]};//object with array of suitable products
      var arr_products = data.products;
      var counter = 0; 
      data_products.products.length == 0;
      for (var i = 0; i < arr_products.length; i++) {
        //make object with array of suitable products, need for handlebars.js
        if (category_id == arr_products[i].category_id) {
          data_products.products[counter]=arr_products[i];
          counter++;
        }       
      }

      switch (sorted_mode) {
        case 0:
          generatingProdItem(data_products);
          break;
        case 1:
          data_products.products.sort(function(obj1, obj2) {
            //sort array by ascending price
            return obj1.price-obj2.price;
          });

          generatingProdItem(data_products);
          break;
        case 2:
          data_products.products.sort(function(obj1, obj2) {
            //sort array by ascending price
            return obj2.price-obj1.price;
          });

          generatingProdItem(data_products);
          break;
        default:
          alert( 'Unknown sorted type');
      }
    });
  }
});