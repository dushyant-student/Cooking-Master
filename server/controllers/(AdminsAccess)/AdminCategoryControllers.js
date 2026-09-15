import CategoryModel from "../../models/categoryModel.js";


export const getAdminsCategories = async (req, res) => {

  try {
    const userId = req.user?.id;
    const allCategories = await CategoryModel.find(
      {
        userId: userId
      }
    );

    if (allCategories) {
      return res.status(200).send(
        {
          "message": "All Categories.. ",
          allCategories, 
          success: true
        }
      )
    }
    return res.status(404).send(
      {
        "message": "You have not Created any category !",
        success: false
      }
    )

  } catch (err) {
    // console.log("Err in category admins:- ",err?.response?.message?.data || err?.message || err);
    res.status(500).json(
      {
        message: "Server error",
        success:false
      }
    );
  }
}


