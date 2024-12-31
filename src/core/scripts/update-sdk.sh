echo "...[REBUILDING-SDKS-PROCESSING]"
echo " "
echo " "
echo " "

echo "...[REBUILDING-AUTH-SDK-PROCESSING]"
echo " "
openapi-generator generate -i https://www.staging-api.medexer.livestocx.xyz/docs/auth-service-json -g typescript-axios -o ../sdk/auth 

echo " "
echo "...[REBUILDING-AUTH-SDK-SUCCESS]"
echo " "
echo " "
echo " "

echo "...[REBUILDING-ACCOUNT-SDK-PROCESSING]"
echo " "
openapi-generator generate -i https://www.staging-api.medexer.livestocx.xyz/docs/account-service-json -g typescript-axios -o ../sdk/account 

echo " "
echo "...[REBUILDING-ACCOUNT-SDK-SUCCESS]"
echo " "
echo " "
echo " "

echo "...[REBUILDING-DONATION-CENTER-SDK-PROCESSING]"
echo " "
openapi-generator generate -i https://www.staging-api.medexer.livestocx.xyz/docs/donation-center-service-json -g typescript-axios -o ../sdk/donation-center 
echo " "
echo "...[REBUILDING-DONATION-CENTER-SDK-SUCCESS]"

echo " "
echo " "
echo " "
echo "...[REBUILDING-SDKS-SUCCESSFUL]"

echo " "
echo " "
echo " "
