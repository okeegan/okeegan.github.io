"use strict";
(function() {
  var x;
  var y;
  var w_x;
  var w_y;
  var aspect_x;
  var aspect_y;
  var grid;
  var mirror;
  var c;
  var ctx;
  var colour = "#fef08b";
  var FPS = 40;

  window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/FPS)};

  var init = function() {
    w_x = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    w_y = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    x = Math.round(w_x / 2);
    y = Math.round(w_y / 2);

    grid = create_array();
    mirror = create_array();
    c = document.getElementById("game");
    c.width = x;
    c.height = y;

    ctx = c.getContext("2d");
    ctx.fillStyle = colour;

    grid = fill_random(grid);
    draw_grid();
    update_grid();
    tick();
  };

  var tick = function() {
    setTimeout(function() {
      draw_grid();
      update_grid();
      requestAnimationFrame(tick);
    }, 1000/FPS);
  }

  var create_array = function() {
    var arr = [];
    for (var i = 0; i < x; i++) {
      arr[i] = [];
    }

    return arr;
  }

  var fill_random = function(arr) {
    var j, k;
    for (var j = 3; j < x - 3; j++) { //iterate through rows
      for (var k = 3; k < y - 3; k++) { //iterate through columns
        grid[j][k] = Math.round(Math.random());
      }
    }

    return arr;
  }

  var draw_grid = function() {
    var c, d;
    ctx.clearRect(0, 0, x, y);
    for (c = 1; c < x; c++) {
      for (d = 1; d < y; d++) {
        if (grid[c][d] === 1) {
          ctx.fillRect(c, d, 1, 1);
        }
      }
    }
  };

  var update_grid = function() {
    var j, k, num_cells;
    for (j = 1; j < x - 1; j++) {
      for (k = 1; k < y - 1; k++) {
        num_cells = 0;

        num_cells += grid[j - 1][k - 1];
        num_cells += grid[j - 1][k];
        num_cells += grid[j - 1][k + 1];

        num_cells += grid[j][k - 1];
        num_cells += grid[j][k + 1];

        num_cells += grid[j + 1][k - 1];
        num_cells += grid[j + 1][k];
        num_cells += grid[j + 1][k + 1];

        switch (num_cells) {
          case 2:
          mirror[j][k] = grid[j][k];

          break;
          case 3:
          mirror[j][k] = 1;

          break;
          default:
          mirror[j][k] = 0;
        }
      }
    }

    var l;
    for (l = 1; l < x - 1; l++) {
      mirror[l][0] = mirror[l][x - 3];
      mirror[l][x - 2] = mirror[l][1];
      mirror[0][l] = mirror[x - 3][l];
      mirror[x - 2][l] = mirror[1][l];
    }

    var temp = grid;
    grid = mirror;
    mirror = temp;
  }

  var tid = setInterval( function () {
      if (document.readyState !== 'complete') return;
      clearInterval(tid);
      init();
  }, 100);

})();
