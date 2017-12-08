/**
 * Make a request for information
 * @param {regit.transactions.RequestInformation} requestInformation - the requestInformation transaction
 * @transaction
 */
function requestInformation(requestInformation) {
    console.log('requestInformation');

    var factory = getFactory();
    var NS_MEMBER = 'regit.member';
    var NS_ASSET = 'regit.assets';
    var NS_TX = 'regit.transactions';
    var TYPE = requestInformation.type;	

    switch (TYPE)
    {
       case "BASIC": 
            var ASSET = NS_ASSET + 'BasicAsset';
            console.log('Information Type:' + TYPE);
       case "FINANCIAL":
            var ASSET = NS_ASSET + 'FinancialAsset';
            console.log('Information Type:' + TYPE);
       case "EDUCATION":
            var ASSET = NS_ASSET + 'EducationAsset';
            console.log('Information Type:' + TYPE);
       case "PASSPORT":
            var ASSET = NS_ASSET + 'PassportAsset';
            console.log('Information Type:' + TYPE);
    }

    var me = getCurrentParticipant();

    var request = factory.newResource(NS_ASSET, ASSET , requestInformation.date);
    request.creator = me.getIdentifier();
    request.viewer = request.creator;

    // save the request
    return getAssetRegistry(request.getFullyQualifiedType())
        .then(function (registry) {
            return registry.add(request);
        })
        .then(function(){
    		var requestInformationEvent = factory.newEvent(NS_TX, 'RequestInformationEvent');
      		requestInformationEvent.date = request.date;
      		requestInformationEvent.request = request.creator;
    		emit(requestInformationEvent);
    	});
}