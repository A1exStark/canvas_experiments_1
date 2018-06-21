    function calculate() {
        var price = 0;
        var price_new = 0;
        var room_length = document.calc.room_length.value;
        var room_width = document.calc.room_width.value;
        var tubes_quantity = document.calc.tubes_quantity.value;
        var lightpoints_quantity = document.calc.lightpoints_quantity.value;
        var angles_quantity = document.calc.angles_quantity.value;
        var svetilnik_quantity = document.calc.svetilnik_quantity.value;
        var svetilnik_quantity_new = 0;
  
         if (svetilnik_quantity >=0 && svetilnik_quantity <= 10) 
            svetilnik_quantity_new = svetilnik_quantity * 290;
            else svetilnik_quantity_new = svetilnik_quantity * 270;
  
  
          if (room_length > 0 && room_width > 0) {
            document.getElementById('roof_size').innerText = room_length * room_width;
            document.getElementById('roof_perimeter').innerText = 2 * room_length + 2 * room_width;
  
            if (document.getElementById('roof_size').innerText >= 0 && document.getElementById('roof_size').innerText <= 14)
                price = room_length * room_width * 290 + (2 * room_length + 2 * room_width) * 40 + tubes_quantity * 200 + lightpoints_quantity * 300 + svetilnik_quantity_new;
           
            if (document.getElementById('roof_size').innerText >= 15 && document.getElementById('roof_size').innerText <= 20)
                price = room_length * room_width * 280 + (2 * room_length + 2 * room_width) * 40 + tubes_quantity * 200 + lightpoints_quantity * 300 + svetilnik_quantity * 270;
  
            if (document.getElementById('roof_size').innerText >= 21 && document.getElementById('roof_size').innerText <= 40)
                price = room_length * room_width * 260 + (2 * room_length + 2 * room_width) * 40 + tubes_quantity * 200 + lightpoints_quantity * 300 + svetilnik_quantity * 270;
           
            if (document.getElementById('roof_size').innerText >= 41)
                price = room_length * room_width * 240 + (2 * room_length + 2 * room_width) * 40 + tubes_quantity * 200 + lightpoints_quantity * 300 + svetilnik_quantity * 270;
}            
        else   
           document.getElementById('roof_size').innerText = "0";
           document.getElementById('price').innerText = price + "руб.";
        return true;
}