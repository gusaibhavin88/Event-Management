const { throwError } = require("../helpers/errorUtil");
const engMessage = require("../messages/english.json");

exports.returnMessage = (module, key, language = "en") => {
  return engMessage[module][key];
};

exports.replaceFields = (inputString, replacements) => {
  for (const [key, value] of Object.entries(replacements)) {
    const pattern = new RegExp(`\\$\\{${key}\\}`, "g");
    inputString = inputString?.replace(pattern, value);
  }
  return inputString;
};

exports.validateEmail = (email) => {
  // email validator from https://github.com/manishsaraan/email-validator/blob/master/index.js
  const regex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  if (!email) return false;
  const email_parts = email.split("@");

  if (email_parts.length !== 2) return false;

  const account = email_parts[0];
  const address = email_parts[1];

  if (account.length > 64) return false;
  else if (address.length > 255) return false;

  const domainParts = address.split(".");

  if (
    domainParts.some((part) => {
      return part.length > 63;
    })
  )
    return false;

  return regex.test(email);
};

exports.passwordValidation = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

  return passwordRegex.test(password);
};

exports.capitalizeFirstLetter = (string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};

exports.validateRequestFields = (payload, fields) => {
  for (const field of fields) {
    if (!payload[field]) {
      switch (field) {
        case "title":
          return throwError(`Title is required.`);
          break;
        case "agenda":
          return throwError(`Agencda is required.`);
          break;
        case "due_time":
          return throwError(`Due time is required.`);
          break;
        case "client_id":
          return throwError(`Client detail is required.`);
          break;
        case "due_date":
          return throwError(`Due date is required.`);
          break;
        case "assign_to":
          return throwError(`Assignee is required.`);
          break;
        case "activity_type":
          return throwError(`Activity type is required.`);
          break;
        case "contact_number":
          return throwError(`Contact number is required.`);
          break;
        case "token":
          return throwError(`Token is required.`);
          break;
        case "first_name":
          return throwError(`First name is required.`);
          break;
        case "last_name":
          return throwError(`Last name is required.`);
          break;
        case "company_name":
          return throwError(`Company name is required.`);
          break;
        case "password":
          return throwError(`Password is required.`);
          break;
        case "email":
          return throwError(`Email is required.`);
          break;
        case "agency_id":
          return throwError(`Agency detail is required.`);
          break;
      }
    }
  }
  return;
};

exports.forgotPasswordEmailTemplate = (link, username) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  style="font-family: arial, 'helvetica neue', helvetica, sans-serif"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title>New message</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Imprima&display=swap"
      rel="stylesheet"
    />
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }
      [data-ogsb] .es-button {
        border-width: 0 !important;
        padding: 15px 20px 15px 20px !important;
      }
      @media only screen and (max-width: 600px) {
        p,
        ul li,
        ol li,
        a {
          line-height: 150% !important;
        }
        h1,
        h2,
        h3,
        h1 a,
        h2 a,
        h3 a {
          line-height: 120%;
        }
        h1 {
          font-size: 30px !important;
          text-align: left;
        }
        h2 {
          font-size: 24px !important;
          text-align: left;
        }
        h3 {
          font-size: 20px !important;
          text-align: left;
        }
        .es-header-body h1 a,
        .es-content-body h1 a,
        .es-footer-body h1 a {
          font-size: 30px !important;
          text-align: left;
        }
        .es-header-body h2 a,
        .es-content-body h2 a,
        .es-footer-body h2 a {
          font-size: 24px !important;
          text-align: left;
        }
        .es-header-body h3 a,
        .es-content-body h3 a,
        .es-footer-body h3 a {
          font-size: 20px !important;
          text-align: left;
        }
        .es-menu td a {
          font-size: 14px !important;
        }
        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 14px !important;
        }
        .es-content-body p,
        .es-content-body ul li,
        .es-content-body ol li,
        .es-content-body a {
          font-size: 14px !important;
        }
        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 14px !important;
        }
        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important;
        }
        *[class="gmail-fix"] {
          display: none !important;
        }
        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important;
        }
        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important;
        }
        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important;
        }
        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important;
        }
        .es-button-border {
          display: block !important;
        }
        a.es-button,
        button.es-button {
          font-size: 18px !important;
          display: block !important;
          border-right-width: 0px !important;
          border-left-width: 0px !important;
          border-top-width: 15px !important;
          border-bottom-width: 15px !important;
        }
        .es-adaptive table,
        .es-left,
        .es-right {
          width: 100% !important;
        }
        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important;
        }
        .es-adapt-td {
          display: block !important;
          width: 100% !important;
        }
        .adapt-img {
          width: 100% !important;
          height: auto !important;
        }
        .es-m-p0 {
          padding: 0px !important;
        }
        .es-m-p0r {
          padding-right: 0px !important;
        }

        .es-m-p0l {
          padding-left: 0px !important;
        }

        .es-m-p0t {
          padding-top: 0px !important;
        }

        .es-m-p0b {
          padding-bottom: 0 !important;
        }

        .es-m-p20b {
          padding-bottom: 20px !important;
        }

        .es-mobile-hidden,
        .es-hidden {
          display: none !important;
        }

        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important;
        }

        tr.es-desk-hidden {
          display: table-row !important;
        }

        table.es-desk-hidden {
          display: table !important;
        }

        td.es-desk-menu-hidden {
          display: table-cell !important;
        }

        .es-menu td {
          width: 1% !important;
        }

        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important;
        }

        table.es-social {
          display: inline-block !important;
        }

        table.es-social td {
          display: inline-block !important;
        }

        .es-desk-hidden {
          display: table-row !important;
          width: auto !important;
          overflow: visible !important;
          max-height: inherit !important;
        }
      }
    </style>
  </head>

  <body
    data-new-gr-c-s-loaded="14.1098.0"
    style="
      width: 100%;
      font-family: arial, 'helvetica neue', helvetica, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      padding: 0;
      margin: 0;
    "
  >
    <div class="es-wrapper-color" style="background-color: #ffffff">
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#ffffff"></v:fill>
        </v:background>
      <![endif]-->
      <table
        class="es-wrapper"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          border-collapse: collapse;
          border-spacing: 0px;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          background-position: center top;
          background-color: #ffffff;
        "
      >
        <tr>
          <td valign="top" style="padding: 0; margin: 0">
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-footer"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
                background-color: transparent;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#560082"
                    class="es-footer-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          margin: 0;
                          padding-top: 20px;
                          padding-bottom: 20px;
                          padding-left: 40px;
                          padding-right: 40px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 520px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      font-size: 0px;
                                    "
                                  >
                            
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-content"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#560082"
                    class="es-content-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #2b2b27;
                      border-radius: 20px 20px 0px 0px;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-top: 20px;
                          padding-left: 20px;
                          padding-right: 20px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                bgcolor="#fafafa"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: separate;
                                  border-spacing: 0px;
                                  background-color: #fafafa;
                                  border-radius: 10px;
                                "
                                role="presentation"
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 20px; margin: 0"
                                  >
                                    <h3
                                      style="
                                        margin: 0;
                                        line-height: 34px;
                                        mso-line-height-rule: exactly;
                                        font-family: -apple-system,
                                          blinkmacsystemfont, 'segoe ui', roboto,
                                          helvetica, arial, sans-serif,
                                          'apple color emoji', 'segoe ui emoji',
                                          'segoe ui symbol';
                                        font-size: 24px;
                                        font-style: normal;
                                        font-weight: bold;
                                        color: #111318;
                                        text-align: center;
                                      "
                                    >
                                      Hi <span>${username}</span>,&nbsp;
                                    </h3>
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: -apple-system,
                                          blinkmacsystemfont, 'segoe ui', roboto,
                                          helvetica, arial, sans-serif,
                                          'apple color emoji', 'segoe ui emoji',
                                          'segoe ui symbol';
                                        line-height: 27px;
                                        color: #111318;
                                        font-size: 18px;
                                      "
                                    >
                                      <br />
                                    </p>
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: -apple-system,
                                          blinkmacsystemfont, 'segoe ui', roboto,
                                          helvetica, arial, sans-serif,
                                          'apple color emoji', 'segoe ui emoji',
                                          'segoe ui symbol';
                                        line-height: 27px;
                                        color: #111318;
                                        font-size: 16px;
                                        margin-bottom: 30px;
                                      "
                                    >
                                    We’re Sending you this email because You requested a password reset. click on this link to create a new password: 
                                    </p>
                               
                                    <a
                                      target="_blank"
                                      href="${link}"
                                      style="
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        text-decoration: none;
                                        background-color: #2b2b27;
                                        padding: 10px 20px;
                                        width: 170px;
                                        display: block;
                                        font-weight: 600;
                                        color: #fff;
                                        font-size: 16px;
                                        font-family: -apple-system,
                                          blinkmacsystemfont, 'segoe ui', roboto,
                                          helvetica, arial, sans-serif,
                                          'apple color emoji', 'segoe ui emoji',
                                          'segoe ui symbol';
                                        margin-top: 30px;
                                        margin-bottom: 30px;
                                      "
                                      >Password Reset</a
                                    >
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-content"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#ffefc4"
                    class="es-content-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #2b2b27;
                      border-radius: 0px 0px 20px 20px;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        class="esdev-adapt-off"
                        align="left"
                        style="
                          margin: 0;
                          padding-top: 20px;
                          padding-bottom: 20px;
                          padding-left: 40px;
                          padding-right: 40px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 520px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 0; margin: 0"
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: Imprima, Arial, sans-serif;
                                        line-height: 24px;
                                        color: #2d3142;
                                        font-size: 16px;
                                      "
                                    >
                                   <a
                                        target="_blank"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #2d3142;
                                          font-size: 16px;
                                        "
                                        href="${process.env.REACT_APP_URL}"
                                      ></a>
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-footer"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
                background-color: transparent;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#bcb8b1"
                    class="es-footer-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td align="left" style="padding: 20px; margin: 0">
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="left"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    class="es-m-txt-c"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 10px;
                                      padding-bottom: 20px;
                                      font-size: 0;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="es-table-not-adapt es-social"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        
                                       
                                        <td
                                          align="center"
                                          valign="top"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-right: 5px;
                                          "
                                        >
                                     
                                        </td>
                                       
                                        <td
                                          align="center"
                                          valign="top"
                                          style="padding: 0; margin: 0"
                                        >
                                     
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 0; margin: 0"
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: Imprima, Arial, sans-serif;
                                        line-height: 20px;
                                        color: #2d3142;
                                        font-size: 13px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: none;
                                          color: #2d3142;
                                          font-size: 14px;
                                        "
                                        href=""
                                      ></a
                                      ><a
                                        target="_blank"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: none;
                                          color: #2d3142;
                                          font-size: 13px;
                                        "
                                        href=""
                                        ></a
                                      >
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 20px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: Imprima, Arial, sans-serif;
                                        line-height: 21px;
                                        color: #2d3142;
                                        font-size: 14px;
                                      "
                                    >
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
  `;
};
exports.verifyUser = (link, username) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  style="font-family: arial, 'helvetica neue', helvetica, sans-serif"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title>New message</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Imprima&display=swap"
      rel="stylesheet"
    />
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }
      [data-ogsb] .es-button {
        border-width: 0 !important;
        padding: 15px 20px 15px 20px !important;
      }
      @media only screen and (max-width: 600px) {
        p,
        ul li,
        ol li,
        a {
          line-height: 150% !important;
        }
        h1,
        h2,
        h3,
        h1 a,
        h2 a,
        h3 a {
          line-height: 120%;
        }
        h1 {
          font-size: 30px !important;
          text-align: left;
        }
        h2 {
          font-size: 24px !important;
          text-align: left;
        }
        h3 {
          font-size: 20px !important;
          text-align: left;
        }
        .es-header-body h1 a,
        .es-content-body h1 a,
        .es-footer-body h1 a {
          font-size: 30px !important;
          text-align: left;
        }
        .es-header-body h2 a,
        .es-content-body h2 a,
        .es-footer-body h2 a {
          font-size: 24px !important;
          text-align: left;
        }
        .es-header-body h3 a,
        .es-content-body h3 a,
        .es-footer-body h3 a {
          font-size: 20px !important;
          text-align: left;
        }
        .es-menu td a {
          font-size: 14px !important;
        }
        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 14px !important;
        }
        .es-content-body p,
        .es-content-body ul li,
        .es-content-body ol li,
        .es-content-body a {
          font-size: 14px !important;
        }
        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 14px !important;
        }
        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important;
        }
        *[class="gmail-fix"] {
          display: none !important;
        }
        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important;
        }
        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important;
        }
        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important;
        }
        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important;
        }
        .es-button-border {
          display: block !important;
        }
        a.es-button,
        button.es-button {
          font-size: 18px !important;
          display: block !important;
          border-right-width: 0px !important;
          border-left-width: 0px !important;
          border-top-width: 15px !important;
          border-bottom-width: 15px !important;
        }
        .es-adaptive table,
        .es-left,
        .es-right {
          width: 100% !important;
        }
        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important;
        }
        .es-adapt-td {
          display: block !important;
          width: 100% !important;
        }
        .adapt-img {
          width: 100% !important;
          height: auto !important;
        }
        .es-m-p0 {
          padding: 0px !important;
        }
        .es-m-p0r {
          padding-right: 0px !important;
        }

        .es-m-p0l {
          padding-left: 0px !important;
        }

        .es-m-p0t {
          padding-top: 0px !important;
        }

        .es-m-p0b {
          padding-bottom: 0 !important;
        }

        .es-m-p20b {
          padding-bottom: 20px !important;
        }

        .es-mobile-hidden,
        .es-hidden {
          display: none !important;
        }

        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important;
        }

        tr.es-desk-hidden {
          display: table-row !important;
        }

        table.es-desk-hidden {
          display: table !important;
        }

        td.es-desk-menu-hidden {
          display: table-cell !important;
        }

        .es-menu td {
          width: 1% !important;
        }

        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important;
        }

        table.es-social {
          display: inline-block !important;
        }

        table.es-social td {
          display: inline-block !important;
        }

        .es-desk-hidden {
          display: table-row !important;
          width: auto !important;
          overflow: visible !important;
          max-height: inherit !important;
        }
      }
    </style>
  </head>

  <body
    data-new-gr-c-s-loaded="14.1098.0"
    style="
      width: 100%;
      font-family: arial, 'helvetica neue', helvetica, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      padding: 0;
      margin: 0;
    "
  >
    <div class="es-wrapper-color" style="background-color: #ffffff">
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#ffffff"></v:fill>
        </v:background>
      <![endif]-->
      <table
        class="es-wrapper"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          border-collapse: collapse;
          border-spacing: 0px;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          background-position: center top;
          background-color: #ffffff;
        "
      >
        <tr>
          <td valign="top" style="padding: 0; margin: 0">
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-footer"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
                background-color: transparent;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#560082"
                    class="es-footer-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          margin: 0;
                          padding-top: 20px;
                          padding-bottom: 20px;
                          padding-left: 40px;
                          padding-right: 40px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 520px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      font-size: 0px;
                                    "
                                  >
                            
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-content"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#560082"
                    class="es-content-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #2b2b27;
                      border-radius: 20px 20px 0px 0px;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-top: 20px;
                          padding-left: 20px;
                          padding-right: 20px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                bgcolor="#fafafa"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: separate;
                                  border-spacing: 0px;
                                  background-color: #fafafa;
                                  border-radius: 10px;
                                "
                                role="presentation"
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 20px; margin: 0"
                                  >
                                    <h3
                                      style="
                                        margin: 0;
                                        line-height: 34px;
                                        mso-line-height-rule: exactly;
                                        font-family: -apple-system,
                                          blinkmacsystemfont, 'segoe ui', roboto,
                                          helvetica, arial, sans-serif,
                                          'apple color emoji', 'segoe ui emoji',
                                          'segoe ui symbol';
                                        font-size: 24px;
                                        font-style: normal;
                                        font-weight: bold;
                                        color: #111318;
                                        text-align: center;
                                      "
                                    >
                                      Hi <span>${username}</span>,&nbsp;
                                    </h3>
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: -apple-system,
                                          blinkmacsystemfont, 'segoe ui', roboto,
                                          helvetica, arial, sans-serif,
                                          'apple color emoji', 'segoe ui emoji',
                                          'segoe ui symbol';
                                        line-height: 27px;
                                        color: #111318;
                                        font-size: 18px;
                                      "
                                    >
                                      <br />
                                    </p>
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: -apple-system,
                                          blinkmacsystemfont, 'segoe ui', roboto,
                                          helvetica, arial, sans-serif,
                                          'apple color emoji', 'segoe ui emoji',
                                          'segoe ui symbol';
                                        line-height: 27px;
                                        color: #111318;
                                        font-size: 16px;
                                        margin-bottom: 30px;
                                      "
                                    >
                                    Thank you for signing up! To ensure the security of your account and complete the registration process, please click on the link below to verify your account:                                    </p>
                               
                                    <a
                                      target="_blank"
                                      href="${link}"
                                      style="
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        text-decoration: none;
                                        background-color: #2b2b27;
                                        padding: 10px 20px;
                                        width: 170px;
                                        display: block;
                                        font-weight: 600;
                                        color: #fff;
                                        font-size: 16px;
                                        font-family: -apple-system,
                                          blinkmacsystemfont, 'segoe ui', roboto,
                                          helvetica, arial, sans-serif,
                                          'apple color emoji', 'segoe ui emoji',
                                          'segoe ui symbol';
                                        margin-top: 30px;
                                        margin-bottom: 30px;
                                      "
                                      >Verify</a
                                    >
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-content"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#ffefc4"
                    class="es-content-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #2b2b27;
                      border-radius: 0px 0px 20px 20px;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        class="esdev-adapt-off"
                        align="left"
                        style="
                          margin: 0;
                          padding-top: 20px;
                          padding-bottom: 20px;
                          padding-left: 40px;
                          padding-right: 40px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 520px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 0; margin: 0"
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: Imprima, Arial, sans-serif;
                                        line-height: 24px;
                                        color: #2d3142;
                                        font-size: 16px;
                                      "
                                    >
                                 <a
                                        target="_blank"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #2d3142;
                                          font-size: 16px;
                                        "
                                        href="${process.env.REACT_APP_URL}"
                                      ></a>
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-footer"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
                background-color: transparent;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#bcb8b1"
                    class="es-footer-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td align="left" style="padding: 20px; margin: 0">
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="left"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    class="es-m-txt-c"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 10px;
                                      padding-bottom: 20px;
                                      font-size: 0;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="es-table-not-adapt es-social"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        
                                       
                                        <td
                                          align="center"
                                          valign="top"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-right: 5px;
                                          "
                                        >
                                     
                                        </td>
                                       
                                        <td
                                          align="center"
                                          valign="top"
                                          style="padding: 0; margin: 0"
                                        >
                                     
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 0; margin: 0"
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: Imprima, Arial, sans-serif;
                                        line-height: 20px;
                                        color: #2d3142;
                                        font-size: 13px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: none;
                                          color: #2d3142;
                                          font-size: 14px;
                                        "
                                        href=""
                                      ></a
                                      ><a
                                        target="_blank"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: none;
                                          color: #2d3142;
                                          font-size: 13px;
                                        "
                                        href=""
                                        ></a
                                      >
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 20px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: Imprima, Arial, sans-serif;
                                        line-height: 21px;
                                        color: #2d3142;
                                        font-size: 14px;
                                      "
                                    >
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
  `;
};

exports.paginationObject = (paginationObject) => {
  const page = paginationObject.page || 1;
  const result_per_page = paginationObject.items_per_page || 10;
  const skip = result_per_page * (page - 1);
  const sort_by = [
    [
      paginationObject?.sort_field ?? "createdAt",
      paginationObject?.sort_order ?? "asc",
    ],
  ];

  return { page, skip, result_per_page, sort_by };
};
