import React, { Component } from "react";
import HeaderMenu from "../Header/Header";

import MoviesList from "../MoviesList/MoviesList";
import OffLine from "../OffLine/OffLine";
import { Offline, Online } from "react-detect-offline";
import { Pagination, Layout, ConfigProvider } from "antd";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <>
        <Offline>
          <OffLine />
        </Offline>
        <Online>
          <Layout className="moviesapp">
            <HeaderMenu />
            <MoviesList />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px 0 0 0",
              }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#fff",
                  },
                  components: {
                    Pagination: {
                      itemActiveBg: "#1677ff",
                      itemSize: 24,
                    },
                  },
                }}
              >
                <Pagination defaultCurrent={1} total={50} />
              </ConfigProvider>
            </div>
          </Layout>
        </Online>
      </>
    );
  }
}
