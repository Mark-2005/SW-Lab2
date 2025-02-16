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

function viewInventory()
{
    console.log("=== Inventory ===", inventoryItems);
}
//function doStuff(action, b) 
{
    
    if (["add", "edit", "rmI"].includes(action)) 
    {
        if (action === "add") 
        {
            
            //var item = { n: b[0], cat: b[1], qty: b[2], prc: b[3], unt: b[4], added: new Date(), custF: b[5] || {} };
            inventoryItems.push(item);
            if (!categories.includes(b[1])) 
            {
                categories.push(b[1]);
            }
            
            transactions.push({ type: "add", item: item });
        } 
        else if (action === "edit" && inventoryItems[b[0]]) 
        {
            transactions.push({ type: "edit", old: inventoryItems[b[0]], new: b.slice(1) });
            inventoryItems[b[0]] = { ...inventoryItems[b[0]], n: b[1], cat: b[2], qty: b[3], prc: b[4], unt: b[5], custF: b[6] || {} };
        } else if (action === "rmI" && inventoryItems[b[0]]) {
            transactions.push({ type: "delete", itm: inventoryItems[b[0]] });
            inventoryItems.splice(b[0], 1);
        }
        console.log("=== Dashboard ===\nItems: " + inventoryItems.length + "\nTotal: $" + inventoryItems.reduce((tot, x) => tot + x.qty * x.prc, 0).toFixed(2) + "\nCats: " + categories.join(', '));
    }
    if (["Sale", "rstck"].includes(action)) {
        for (let k of inventoryItems) {
            if (k.n === b[0]) {
                if (action === "Sale" && k.qty >= b[1]) {
                    k.qty -= b[1];
                    transactions.push({ type: "sale", itm: k, qtyS: b[1], d: new Date() });
                    console.log(`Sold ${b[1]} ${k.unt} of ${k.n}`);
                } else if (action === "rstck") {
                    k.qty += b[1];
                    transactions.push({ type: "restock", itm: k, qtyR: b[1], d: new Date() });
                    console.log(`Restocked ${b[1]} ${k.unt} of ${k.n}`);
                }
                break;
            }
        }
    }
    if (action === "srch") console.log(inventoryItems.filter(x => [x.n, x.cat, x.prc].some(v => v.toString().toLowerCase().includes(b[0].toLowerCase()))));
    if (action === "vwI") console.log("=== Inv ===", inventoryItems);
    if (action === "xprtAll") console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(inventoryItems.map(x => Object.values(x).join(','))).join('\n'));
    if (action === "vwAllT") console.log("Transactions:\n", transactions);
    if (action === "vwIAg") console.log(inventoryItems.map(x => `${x.n}: ${Math.floor((new Date() - new Date(x.added)) / (1000 * 60 * 60 * 24))}d`).join('\n'));
    if (action === "Imprt") b[0].forEach(x => doStuff("add", [x.n, x.cat, x.quantity, x.price, x.unit]));
    if (action === "addFld" && !f[b[0]]) f[b[0]] = null;
    if (action === "udCFld") inventoryItems.find(x => x.n === b[0])?.custF[b[1]] = b[2];
}
