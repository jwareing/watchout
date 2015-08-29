// start slingin' some d3 here.
var score = 0;
var collisions = 0;
var highScore = 0;
var invincibilityTimer = 0;
var enemyMoveTime = 2000;
var numberOfEnemies = 20;
var width = window.outerWidth;
var height = window.outerHeight; 

var createBoard = function(){
   d3.select('.container').selectAll('svg')
    .data([[window.outerWidth,window.outerHeight]])
    .attr('width',function(d){return d[0];})
    .attr('height',function(d){return d[1]-300;}); 

  d3.select('.container').selectAll('svg')
    .data([[window.outerWidth,window.outerHeight]])
    .enter()
    .append('svg')
    .attr('width',function(d){return d[0];})
    .attr('height',function(d){return d[1]-300;});

  width = d3.select('svg')
    .attr('width') ;
  height = d3.select('svg')
    .attr('height') ;
}


var enemyMove = function(){
  var coords = generateMultipleCoords(numberOfEnemies);
  d3.select('svg').selectAll('.enemy')
    .data(coords)
    .transition().duration(enemyMoveTime)
    .attr('x', function(d) {return d[0]-25})
    .attr('y', function(d) {return d[1]-25})
    //.attr('radius', 25)
    //.attr('transform', "rotate(40)");


  // CODE BELOW ADDS SOME ENEMIES WITH NEW TYPE - REVISIT LATER
  d3.select('svg').selectAll('.enemy')
    .data(coords)
    .enter()
    .append('image')
    .attr('class','enemy')
    .attr({'xlink:href':"asteroid.png"})
    .attr('x', function(d) {return d[0]})
    .attr('y', function(d) {return d[1]})
    .attr('width','50px')
    .attr('height','50px')
    .attr('radius', 25);
};

var createPlayer = function() {
  d3.select('svg').selectAll('.player')
    .data([[500,300]])
    .enter()
    .append('image')
    .attr('class','player')
    .attr({'xlink:href':"greenball.png"})
    .attr('x', function(d) {return d[0]-15})
    .attr('y', function(d) {return d[1]-15})
    .attr('width','30px')
    .attr('height','30px')
    .attr('radius', 15)
    .call(drag);
};

var drag = d3.behavior.drag()
  .on('drag',function(){ player.attr('x', (d3.event.x)-15)
    .attr('y', (d3.event.y)-15)});

var generateRandomCoords = function() {
  var x = (Math.random() * width);
  var y = (Math.random() * height);
  return [x, y];
};

var generateMultipleCoords = function(n) {
  var results = [];
  for (var i = 0; i < n; i++) {
    results.push(generateRandomCoords());
  }
  return results;
};


var playerKeeper = function(){
  if (Number(player.attr('x'))<=0){
    player.attr('x',0);
  }

  if (Number(player.attr('x'))>=width-Number(player.attr('radius'))){
    player.attr('x',width-30);
  }

  if (Number(player.attr('y'))<=0){
    player.attr('y',0);
  }

  if (Number(player.attr('y'))>=height-Number(player.attr('radius'))){
    player.attr('y',height-30);
  }
}

var updateBoard = function() {
  score++;


  d3.select('.current').select('span')
    .text(score);
  d3.select('.collisions').select('span')
    .text(collisions);

  if (score>highScore){
    highScore = score;
    d3.select('.high').select('span')
    .text(highScore);
  }
  d3.select('.scoreboard')
    .attr('width',width)
};

var collisionCheck = function(){
  var radiusSum, enemyX, enemyY, playerX, playerY, xDiff, yDiff, separation;
  invincibilityTimer--;
  d3.select('svg').selectAll('.enemy').each (function(d, i) {
    radiusSum = Number(d3.select(this).attr("radius"))+Number(d3.select('.player').attr("radius"));
    enemyX = d3.select(this).attr("x");
    enemyY = d3.select(this).attr("y");
    playerX = d3.select('.player').attr("x");
    playerY = d3.select('.player').attr("y");
    xDiff = enemyX - playerX;
    yDiff = enemyY - playerY;
    separation = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));
    if (separation<radiusSum && invincibilityTimer <= 0){
      collisions++;
      score = 0;
      invincibilityTimer = 10;
    }
  })
};

createBoard();
createPlayer();
var player = d3.select('.player');
enemyMove();
enemyMove();

setInterval(function(){createBoard()});

setInterval(function(){playerKeeper()});

setInterval(function(){ collisionCheck()},100);

setInterval(function(){ enemyMove()},enemyMoveTime);

setInterval(function(){ updateBoard()}, 100);