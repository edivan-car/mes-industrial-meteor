import React from 'react';
import {Header} from "../components/Header";
import {MainLayout} from "../layouts/MainLayout";

export const MachinePage = () => {
    return (
        <MainLayout>
            {/* CABEÇALHO */}
            <Header />

            <h1>Olá pra todos...!</h1>
        </MainLayout>
    )
}