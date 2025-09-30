import prisma from "../config/prisma.js";

export const getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    return res.json({ success: true, message: users });
  } catch (err) {
    return res.json({
      success: false,
      message: `Getting error: ${err.message}`,
    });
  }
};

export const Add = async (req, res) => {
  let { name, contact } = req.body;

  contact = parseInt(contact);
  if (!name || !contact) {
    return res.json({ success: false, message: "All fields are required" });
  }
  try {

    const isExistUser = await prisma.user.findFirst({where: {contact}});

    if (isExistUser) {
      return res.json({ success: false, message: "User number alredy exists!" });
    }

    const newUser = await prisma.user.create({ data: { name, contact } });

    return res.json({ success: true, message: "User added succesfully!" });
  } catch (err) {
    console.log("Insert error: ", err);
    return res.json({ success: false, message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deletedUser = await prisma.user.delete({ where: { id } });

    return res.json({
      success: true,
      message: "User dleted successfully...",
      deletedUser,
    });
  } catch (err) {
    console.log("Database error: ", err.message);
    return res.json({ success: false, message: err.message });
  }
};

export const update = async (req, res) => {
  let { name, contact } = req.body;
  const id = parseInt(req.params.id);
  
  contact = parseInt(contact);

  if (!name || !contact) {
    return res.json({ success: false, message: "All fields are required" });
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, contact },
    });

    return res.json({
      success: true,
      message: "User updated succesfully!",
      updatedUser,
    });
  } catch (err) {
    console.log("update error: ", err.message);
    return res.json({ success: false, message: err.message });
  }
};
