var inventoryItems = [], transactions = [], categories = [], customerFields = {};


class Item 
{
    constructor(name, category, quantity, price, unit, customerField = {}) 
    {
      this.name = name;
      this.category = category;
      this.quantity = quantity;
      this.price = price;
      this.unit = unit;
      this.added = new Date();
      this.customerField = customerField;
    }
  }
function addItem(item)
{
    inventoryItems.push(item);
    if (!categories.includes(category)) 
    {
        categories.push(category);
    }
            
    transactions.push({ type: "add", item: item });
}

function removeItem(Name)
{

    const index = inventoryItems.findIndex(item => item.name === Name);
  if (index !== -1) 
    {
    inventoryItems.splice(index, 1);
    }
    else
    {
        console.log("Item not found");
    }
}

function sellItem(name, quantity)
{
    const item = inventoryItems.find(item => item.name === name);
    if (item.quantity >= quantity) 
    {
        item.quantity -= quantity;
        
        transactions.push({ type: "sale", item: item, quantitySold: quantity, date: new Date() });

        console.log(`Sold ${quantity} ${item.unit} of ${item.name}`);
        if(item.quantity === 0)
        {
            removeItem(item.name);
        }
    } 
    else 
    {
        console.log("Insufficient quantity");
    }
}

function editItem(itemparameters)
{
    const index = inventoryItems.findIndex(item => item.itemparameters[0] === Name);
    transactions.push({ type: "edit", old: inventoryItems[itemparameters[0]], new: itemparameters.slice(1) });
    inventoryItems[index] = { ...inventoryItems[index], name: itemparameters[1], category: itemparameters[2], quantity: itemparameters[3], price: itemparameters[4], unit: itemparameters[5], customerField: itemparameters[6] || {} };
}

function restockItem(name, quantity)
{
    const item = inventoryItems.find(item => item.name === name);
    item.quantity += quantity;
    transactions.push({ type: "restock", item: item, quantityRestocked: quantity, date: new Date() });
    console.log(`Restocked ${quantity} ${item.unit} of ${item.name}`);
}

function viewInventory()
{
    console.log("=== Inventory ===", inventoryItems);
}

function searchItem(Name)
{
    console.log(inventoryItems.filter(item => [item.name, item.category, item.price].some(value => value.toString().toLowerCase().includes(Name.toLowerCase()))));
}

function viewAllTransactions()
{
    console.log("Transactions:\n", transactions);
}

function viewInventoryAge()
{
    console.log(inventoryItems.map(item => `${item.name}: ${Math.floor((new Date() - new Date(item.added)) / (1000 * 60 * 60 * 24))}d`).join('\n'));
}

function addField(fieldName)
{
    if (!customerFields[fieldName]) 
    {
        customerFields[fieldName] = null;
    }
}

function actionTaker(action, itemParameters)
{
    switch (action) {
        case "add":
            addItem(itemParameters);
            break;
        case "edit":
            editItem(itemParameters);
            break;
        case "rmI":
            removeItem(itemParameters[0]);
            break;
        case "Sale":
            sellItem(itemParameters[0], itemParameters[1]);
            break;
        case "rstck":
            restockItem(itemParameters[0], itemParameters[1]);
            break;
        case "srch":
            searchItem(itemParameters[0]);
            break;
        case "vwI":
            viewInventory();
            break;
        case "xprtAll":
            console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(inventoryItems.map(x => Object.values(x).join(','))).join('\n'));
            break;
        case "vwAllT":
            viewAllTransactions();
            break;
        case "vwIAg":
            viewInventoryAge();
            break;
        case "Imprt":
            itemParameters[0].forEach(x => doStuff("add", [x.n, x.cat, x.quantity, x.price, x.unit]));
            break;
        case "addFld":
            addField(itemParameters[0]);
            break;
        case "udCFld":
            inventoryItems.find(x => x.name === itemParameters[0])?.customerField[itemParameters[1]] = itemParameters[2];
            break;
        default:
            console.log("Unknown action");
    }
}

