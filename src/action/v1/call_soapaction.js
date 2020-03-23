/*
* Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

module.exports = {

  name: "call_soapaction",

  title: "Call SOAP Action",

  description: "",
  version: "v1",

  input: {
    title: "Action Input",
    type: "object",
    properties: {
      wsdlUrl: {
        title: "WSDL URL",
        displayTitle: "WSDL URL",
        description: "URL to the WSDL file describing the SOAP Services",
        type: "string",
        minLength: 1,
        propertyOrder: 1
      },
      service: {
        title: "Service",
        displayTitle: "Service",
        description: "Service to be used",
        type: "string",
        minLength: 1,
        propertyOrder: 2
      },
      soapPort: {
        title: "SOAP Port",
        displayTitle: "SOAP Port",
        description: "Port to be used",
        type: "string",
        minLength: 1,
        propertyOrder: 3
      },
      soapAction: {
        title: "SOAP Action",
        displayTitle: "SOAP Action",
        description: "SOAP Action to be called",
        type: "string",
        minLength: 1,
        propertyOrder: 4
      },
      basicSec: {
        title: "Basic Security",
        displayTitle: "Basic Security",
        description: "",
        type: "object",
        properties: {
          user: {
            title: "User",
            displayTitle: "User",
            type: "string",
            description: "Authentication user"
          },
          pwd: {
            title: "Password",
            displayTitle: "Password",
            type: "string",
            format: "password",
            description: "Authentication password"
          },
        }
      },
    }
  },
  // using this property we can generate input properties dynamically, depending on the value selected for another fields
  // the input values are generated in the lookup "getadditionalinput" and it depends on "secondInput"
  form: {
    id: "get_actionrequest",
    dependencies: ["wsdlUrl", "service", "soapPort", "soapAction"]
  },

  output: {
    title: "output",
    type: "object",
    properties: {
      action_output: {
        type: "any",
        title: "Action Result",
        description: ""
      },
      original_output: {
        type: "any",
        title: "SOAP Result",
        description: ""
      },
    }
  },

  mock_input: {
    wsdlUrl: "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL",
    service: "CountryInfoService",
    soapPort: "CountryInfoServiceSoap12",
    soapAction: "FullCountryInfo",
    __dynamicInput__: {
      sCountryISOCode: "DE"
    }
  },

  execute: function (input, output) {
    try {
      if (input.wsdlUrl && input.service && input.soapPort && input.soapAction) {
        var soap = require('strong-soap').soap;
        var options = {};
        soap.createClient(input.wsdlUrl, options, function (err, client) {
          if (input.basicSec && input.basicSec.user && input.basicSec.pwd) {
            client.setSecurity(new soap.BasicAuthSecurity(input.basicSec.user, input.basicSec.pwd));
          }
          if (!input.__dynamicInput__) {
            input.__dynamicInput__ = {};
          }
          // The API Key needed for the call can be found inside input.auth.api_key
          var method = client[input.service][input.soapPort][input.soapAction];
          method(input.__dynamicInput__.actionInput, function (err, result, envelope, soapHeader) {
            // 'result' is the response body
            return output(null, {
              action_output: result,
              original_output: envelope,
              'error': err,
            });
          });
        });
      } else {
        return output(null, {
          msg: 'Unexpected result while calling the service... Please review the incoming output',
          'input': input
        });
      }
    } catch (error) {
      console.log("+-+- ERROR: ", error);
      return output(null, {
        msg: 'Error while calling the service...',
        'input': input,
        'error': error
      });
    }
  }

}