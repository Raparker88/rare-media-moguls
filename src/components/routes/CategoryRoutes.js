import React from "react";
import { Route } from "react-router-dom";
import { CategoryProvider } from "../categories/CategoryProvider";
import { CategoriesList } from "../categories/CategoryList"

export default () => {
    return (
            <CategoryProvider>
                <Route exact path="/categories" render={(props) =>
                    <CategoriesList {...props} />}
                />
            </CategoryProvider>
    )
}