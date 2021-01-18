# approuter-html5-repo-example
Using approuter and HTML5 Application Repository service example

This sample project contains the main components required to develop and run a simple SAP Cloud Foundry business application.
There are two html5 applications:
- myapp: a simple button that by clicking it calls a nodejs server app
- tripv4: an FLP Sandbox triggers a UI on top of the oData.org sample endpoint
- MyFavorites: A UI with tiles that trigger navigation via destinations from destination service

The following apps compose this project:
- approuter
  * Uses the approuter npm from sap.npm.registry
  * Owns the xsuaa service instance that enables authentication and authorization
  * Owns the html5-apps-repo/app-runtime service instance that enables approuter to read static content from html5 app repo
  * Owns the destination/lite service instance that enables approuter to access non-cf backend applications 
  * Defines a destination to access business application local backend
  
- backend
  * A simple nodejs express server that handles requests from approuter
  * Is bound to the xsuaa service instance owned by approuter - used to check that forwarded token is valid
  
- htmlappdeployer
  * Uses the html5 app deployer npm from sap.npm.registry
  * Contains a resources folder with 3 html5 applications that will be uploaded to html5 app repo. Note the manifest.json and xs-app.json files
  * Owns the html5-apps-repo/app-host service instance that enables html5 app deployer to upload content into html5 app repo
  
Lets' get started!

* Make sure that the subaccount aasociated to the cf org where you plan to develop your application is entitled to HTML5 Application Repository app-host plan.
  Note that the entitlement unit of meassure is in megabytes and that the default size limit of an app-host service instance is 2 MB.
  
** In the approuter manifest.yaml the destination url domain should be replaced by the domain in your landscape. In addition prefix the host with your user id.

*** In the manifest.yaml files prefix hosts with your user id to avoid clashes with other users (host is globally unique in cf) 

1. Set your npm registry configuration to access sap npm registry
   in your /<user>/.npmrc file add a line: @sap:registry=https://npm.sap.com
   
2. Run npm install in the 3 folders: approuter, backend, html5appdeployer

3. Create service instances in CF CLI:
   xsuaa:
   ```
     cd approuter
   ```
   ```
     cf create-service xsuaa application demo-approuter-xsuaa -c xs-security.json
   ```
    
   html5-apps-repo/app-runtime:
   ```
     cf create-service html5-apps-repo app-runtime demo-approuter-html5-repo-app-runtime
   ```
     
   html5-apps-repo/app-host:
   ```
     cf create-service html5-apps-repo app-host demo-approuter-html5-repo-app-host
   ```
   destination/lite:
   ```
     cf create-service destination lite demo-approuter-destination
   ```
4. In destinations UI in SAP Cloud Platform cockpit import all destinations in the destinations folder
     
5. In CF CLI switch directory to the 3 directories and perform cf push

Generate private key from certificate: openssl pkcs12 -in cert.p12 -out key.txt -nodes -nocerts

To run the applications use urls:
   ```
   https://<youruserid>-demo-approuter.<yourlandscapedomain>/myapp/index.html
   ```
   ```
   https://<youruserid>-demo-approuter.<yourlandscapedomain>/tripv4/webapp/test/flpSandbox.html
   ```
   ```
   https://<youruserid>-demo-approuter.<yourlandscapedomain>/favorites/index.html
   ```
     
     
     https:// test-approuterbs.cfapps.sap.hana.ondemand.com/cp.portal
     
     https://saas-approuter-consumer3-ias-approuter.cfapps.sap.hana.ondemand.com/favorites/index.html
     
     https://ias-standalone-ar-consumer-ias-approuter.cfapps.sap.hana.ondemand.com/favorites/index.html
    
/////IAS Support///////
https:36fd578e-b5cd-4376-bd7e-903a9f78ea55--a4amq7ufs-ias-approuter.cfapps.sap.hana.ondemand.com/favorites/index.html

https://ias-provider-ias-approuter.cfapps.sap.hana.ondemand.com/favorites/index.html

https://36fd578e-b5cd-4376-bd7e-903a9f78ea55--a4amq7ufs-ias-approuter.cfapps.sap.hana.ondemand.com/favorites/logout-page.html

https://36fd578e-b5cd-4376-bd7e-903a9f78ea55--a4amq7ufs-ias-approuter.cfapps.sap.hana.ondemand.com/favorites/index.html

https://802bdb6d-4fbc-4cc6-94ab-9975d44fe672--akv1k9tpg-ias-approuter.cfapps.sap.hana.ondemand.com/favorites/index.html

cf bs ias-approuter ias-provider-ias -c ias-bindingIASProvider.json

