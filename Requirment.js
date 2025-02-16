/*IMPORTANT NOTES
1- you are using JS Name Casing (CamelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

class Point {
  //this constructor is used to construct the pt class
  constructor(coordinateX, coordinateY) 
  {
    this.coordinateX = coordinateX;
    this.coordinateY = coordinateY;
  }
}

function isValidDimension(dimension) 
{
  return dimension && dimension > 0;
}

class Rectangle {
  constructor(startingPoint, width, height) 
  {
    if (!isValidDimension(width) || !isValidDimension(height)) 
    {
      throw Error("invalid Width and Height"); 
    }
    this.startingPoint = startingPoint;
    this.width = width; 
    this.height = height; 
  }

  // ***************
  // METHODS
  // ***************

  calculateArea() 
  {
    const area=this.width*this.height;
    return area;
  }

  calculatePerimeter() 
  { 
    const perimeter=2*(this.width+this.height);
    return perimeter;
  }
  
  printEndPoints(topRight, bottomLeft)
  {
    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }
  
  calculateEndPoints() 
  {
    const topRight = this.startingPoint.coordinateX + this.width;
    const bottomLeft = this.startingPoint.coordinateY + this.height;
    this.printendPoints(topRight, bottomLeft);
  }

  updateMyHeight(height) 
  {
    if (isValidDimension(height)) 
    {
      this.height = height;
    }
  }

  updateRectangleDimensions( startingPoint, width, height ) 
  {
    if (!isValidDimension(width) || !isValidDimension(height))
    {
      throw Error("invalid Width and Height");
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  getWidth() 
  {
    return this.width;
  }

  getHeight() 
  {
    return this.height;
  }

}

function buildRectangle(Width, x, Height, y) 
{
  const mainPoint = new Point(x, y);
  const rectangle = new Rectangle(mainPoint, Width, Height);
  return rectangle;
}

function constructSquare(coordinateX, coordinateY, SquareHeight) {
  let square;
  if (!isValidDimension(SquareHeight))
  {
    square = buildRectangle(SquareHeight, coordinateX, SquareHeight, coordinateY);
  }
  calculateSquareDimensions(square);
}

function calculateSquareDimensions(square)
{
  const square_area = square.area();
  const squarePerimeter = square.calculatePerimeter();
  console.log("square Area ", square_area);
  console.log("square Perimeter ", squarePerimeter);
}

const rectangle = buildRectangle(2, 3, 5, 4);
const square = constructSquare(2,3,4);

square.calculateEndPoints();

rectangle.updateMyHeight(3);
