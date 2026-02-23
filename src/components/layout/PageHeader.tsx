import React from "react";
import BannerImg from "../../assets/img/banners/07.jpg";
import { useTranslation } from "react-i18next";

// Define props interface with proper types
interface PageHeaderProps {
  title: string;
  content?: string; // Optional since it might not always be used
  breadcrumb: string;
  className?: string; // Optional with default value
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  content,
  breadcrumb,
  className = "", // Default to empty string if not provided
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="page-header-area bg-img"
      style={{
        backgroundImage:
          `url(${BannerImg})`,
      }}
    >
      <div className="page-header-area-inner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="page-header-content-inner">
                <div className="page-header-content">
                  <h2>{title}</h2>
                  {content && <div>{content}</div>}
                  <div className="breadcrumb-wrapper">
                    <span>
                      <a href={import.meta.env.PUBLIC_URL + "/"} title="Homepage">
                        <i className="ti ti-home" />
                        &nbsp;&nbsp;{t("home")}
                      </a>
                    </span>
                    <span className="bread-sep">&nbsp;/&nbsp;</span>
                    {breadcrumb}
                  </div>
                  {className && <div className={className}></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
