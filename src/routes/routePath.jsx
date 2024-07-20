import Ads from "@/pages/cms/ads";
import Dashboard from "@/pages/cms/dashboard";
import React from "react";
import { Route, Routes, useRoutes } from 'react-router-dom';
// import { RequiredAuth } from "../state/RequiredAuth";


export const RoutePath = () => 
{
    return (
            <Routes>
                <Route path='/' element={<Dashboard/>}></Route>
                <Route path='/ads' element={<Ads />}></Route>
            </Routes>
    );
}