import dynamoDB from '../db.js'

const tableName = 'lab13';

export const renderCustomers = async (req, res) => {
  // const [rows] = await pool.query("SELECT * FROM customer");
  // res.render("customers", { customers: rows });

  const params = {
    TableName: tableName
  };

  try {
    const result = await dynamoDB.scan(params).promise();
    const customers = result.Items
    res.render('customers', { customers })
  } catch (error) {
    console.log('Error al obtener a los clientes', error)
    res.render('error');
  }

};

export const createCustomers = async (req, res) => {
  const newCustomer = req.body;
  // await pool.query("INSERT INTO customer set ?", [newCustomer]);
  // res.redirect("/");
  const params = {
    TableName: tableName,
    Item: newCustomer,
  };

  try {
    await dynamoDB.put(params).promise()
    res.redirect("/")
  } catch (error) {
    console.log('Error al crear al cliente', error)
    res.render(error)
  }
};

export const editCustomer = async (req, res) => {
  // const { id } = req.params;
  // const [result] = await pool.query("SELECT * FROM customer WHERE id = ?", [
  //   id,
  // ]);
  // res.render("customers_edit", { customer: result[0] });
  const { id } = req.params
  const params = {
    TableName: tableName,
    Key: { id },
  };

  try {
    const result = await dynamoDB.get(params).promise();
    const customer = result.Item
    res.render('customers_edit', { customer })
  } catch (error) {
    console.log('Error al obtener el cliente de DynamoDB', error)
    res.render(error)
  }
};

export const updateCustomer = async (req, res) => {
  // const { id } = req.params;
  // const newCustomer = req.body;
  // await pool.query("UPDATE customer set ? WHERE id = ?", [newCustomer, id]);
  // res.redirect("/");
  const { id } = req.params;
  const { name, address, phone } = req.body;

  const params = {
    TableName: tableName,
    Key: { id },
    UpdateExpression: "set #name = :name, #address = :address, #phone = :phone",
    ExpressionAttributeNames: {
      "#name": "name",
      "#address": "address",
      "#phone": "phone",
    },
    ExpressionAttributeValues: {
      ":name": name,
      ":address": address,
      ":phone": phone,
    },
  };

  try {
    await dynamoDB.update(params).promise();
    res.redirect("/");
  } catch (error) {
    console.log("Error al actualizar el cliente en DynamoDB:", error);
    res.render(error);
  }
};

export const deleteCustomer = async (req, res) => {
  // const { id } = req.params;
  // const result = await pool.query("DELETE FROM customer WHERE id = ?", [id]);
  // if (result.affectedRows === 1) {
  //   res.json({ message: "Customer deleted" });
  // }
  // res.redirect("/");
  const { id } = req.params;
  const params = {
    TableName: tableName,
    Key: { id },
  };

  try {
    await dynamoDB.delete(params).promise();
    res.json({ message: "Customer deleted" });
  } catch (error) {
    console.log("Error al eliminar el cliente de DynamoDB:", error);
    res.render(error);
  }
};
