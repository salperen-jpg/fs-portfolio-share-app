const getLinks = async (req, res) => {
  res.status(200).json({ msg: "LinksS" });
};

const addLink = async (req, res) => {
  res.status(201).json({ msg: "Created" });
};

const getSingleLink = async (req, res) => {
  res.status(200).json({ msg: "Single Link" });
};

const updateLink = async (req, res) => {
  res.status(200).json({ msg: "Update Link" });
};

const deleteLink = async (req, res) => {
  res.status(200).json({ msg: "Delete Link" });
};

export { getLinks, addLink, getSingleLink, updateLink, deleteLink };
