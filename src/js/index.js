$(document).ready(function(){

  $('[type="number"]').stepper();

  showAllCategories();
  showAllProducts();

  // //clear local storage
  // $(window).unload(function(){ 
  //   window.localStorage.clear();
  // });


  if (localStorage.getItem("basket_obj")) {
    //show results basket info
    showResultsBasketInfo(JSON.parse(localStorage.getItem("basket_obj"))); 

    //generate each baskets item
    generatingBasketProducts(JSON.parse(localStorage.getItem("basket_obj")));
  }

  if (localStorage.getItem("basket_obj")) {
    // объект для хранения данных о товарах добавленных в корзину
    var basket_obj = JSON.parse(localStorage.getItem("basket_obj"));
  } else {
    // объект для хранения данных о товарах добавленных в корзину
    var basket_obj = {
      "total_basket_count" : 0,
      "total_basket_price" : 0,
      "basket_products": []
      };
  }


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

  // add product in a basket
  $("main").bind('click', function(e) {
    var $target = $(e.target);

    if ($target.attr('role') == "add-to-basket") {
      var $product_item = $target.closest('[data-product-item]');//product cell block
      var item_title = $product_item.find("[data-title]").text();//title of item
      var item_quantity = parseInt($product_item.find("[data-quantity-item]").val());//quantity item of product
      var item_price = parseFloat($product_item.find("[data-price-item]").text());//price of item 
      var item_id = $product_item.find("[data-item-id]").val();//id of item

      var current_item_id = true;
      for (var i=0; i<basket_obj.basket_products.length; i++ ) {
        if (basket_obj.basket_products[i].id == item_id) {
          basket_obj.basket_products[i].quantity = parseInt(basket_obj.basket_products[i].quantity) + item_quantity;
          current_item_id = false;
        }          
      }

      if (current_item_id) {
        var obj_item={};//obj of product item in basket

        obj_item.title = item_title;
        obj_item.quantity = item_quantity;
        obj_item.price = item_price;
        obj_item.id = item_id;
        
        basket_obj.basket_products.push(obj_item);      
      }

      
      //show results basket info
      showResultsBasketInfo(basket_obj);

      //generate each baskets item
      generatingBasketProducts(basket_obj);

      //save basket_obj in LS
      var obj_item_str = JSON.stringify(basket_obj);
      localStorage.setItem("basket_obj", obj_item_str);

    }
  });

  //change quantity of product in basket
  $('[role="basket-display"]').bind('change', function(e) {
    var $target = $(e.target);
    e.preventDefault();

    if ($target.attr('role') == "change-quantity") {

      var id_item = $target.attr('data-id-item');
      var quantity_item = $target.val();
      for (var i=0; i<basket_obj.basket_products.length; i++ ) {
        if (id_item == basket_obj.basket_products[i].id) {
          basket_obj.basket_products[i].quantity = quantity_item;
        }
      }
      showResultsBasketInfo(basket_obj);
      generatingBasketProducts(basket_obj);
      localStorage.setItem("basket_obj", basket_obj);
    }
  });

  //clear basket
  $('[role="basket-display"]').bind('click', function(e) {
    var $target = $(e.target);
    if ($target.attr('role') == "clear-basket") {

      //clear local storage
      window.localStorage.clear();

      basket_obj.total_basket_count = 0;
      basket_obj.total_basket_price = 0;
      basket_obj.basket_products.length = 0;
      
      generatingBasketProducts(basket_obj);
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

  //generate basket products cell
  function generatingBasketProducts(basket_obj) {
    var $template = $('#handlebars-basket-template');
    var template = Handlebars.compile($template.html());
    $('#handlebars-basket-container').replaceWith(template(basket_obj));    

    $('[type="number"]').stepper();
  } 

  //show results basket info
  function showResultsBasketInfo(basket_obj) {
    
    var total_count = 0;
    var total_price = 0;

    for (var i=0; i<basket_obj.basket_products.length; i++ ) {
      total_count += parseInt(basket_obj.basket_products[i].quantity);
      total_price += (basket_obj.basket_products[i].quantity * basket_obj.basket_products[i].price);
    }

    basket_obj.total_basket_count = parseInt(total_count);
    basket_obj.total_basket_price = Math.ceil(total_price); 

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