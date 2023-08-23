import Link from "../models/Link.js";

const getLinks = async (req, res) => {
  const links = await Link.find({});
  res.status(200).json({ links });
};

const addLink = async (req, res) => {
  const link = await Link.create(req.body);
  res.status(201).json({ link });
};

const getSingleLink = async (req, res) => {
  console.log(req.params);
  const link = await Link.findById(req.params.id);

  res.status(200).json({ msg: link });
};

const updateLink = async (req, res) => {
  const link = await Link.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  res.status(200).json({ link });
};

const deleteLink = async (req, res) => {
  const link = await Link.findOneAndDelete(id);

  res.status(200).json({ msg: "Deleted Link" });
};

export { getLinks, addLink, getSingleLink, updateLink, deleteLink };
