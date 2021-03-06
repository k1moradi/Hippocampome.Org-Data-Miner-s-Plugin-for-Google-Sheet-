function updateReviewForm(Evidence,Covariates,MyRefIds,Morphology,Markers,CellePhys,FiringPatterns,Connectivity) 
{
  var form  = FormApp.openById(reviewFormID);//form.getItems().forEach(function(item){Logger.log('\n//ID:'+item.getId()+'\tType:'+item.getType()+'\tTitle:'+item.getTitle()+'\n')});
  var pForm = new prefillForm(form);
  
//  var myRefIDsMaxRefID     = getMaxOf('My' ,'RefID');
//  var morphologyMaxRefID   = getMaxOf('Mo' ,'RefID');
//  var markersMaxRefID      = getMaxOf('Ma' ,'RefID');
//  var cellEphysMaxRefID    = getMaxOf('CE' ,'RefID');
//  var FPMaxRefID           = getMaxOf('FP' ,'RefID');
//  var connectivityMaxRefID = getMaxOf('Con','RefID');
//  var covariatesMaxRefID   = getMaxOf('Cov','RefID');
//  var dataMaxRefID         = getMaxOf('Da' ,'RefID');

  //form.setTitle(Covariates.Reference);
  //form.setTitle('Review Evidence')
  //form.setDescription();
  //ID:3495476	    Type:TEXT	Title:Active Range
  pForm.prefillItem('3495476',Evidence.rangeA1Notation);
  //ID:277511854	Type:TEXT	Title:Pubmed ID
  pForm.prefillItem('277511854',Evidence.PMID);
  //ID:1965398313	Type:TEXT	Title:Evidence ID
  pForm.prefillItem('1965398313',Evidence.eID);
  
  //----------------------Experiment Description--------------------------------------------
  
  //ID:1109441292	Type:PARAGRAPH_TEXT	Title:
  pForm.prefillItem('1109441292',Evidence.Description);
  
  //----------------------Conclusion--------------------------------------------------------
  
  //ID:1813531463	Type:MULTIPLE_CHOICE	Title:Interpretation
  pForm.prefillItem('1813531463',Evidence.Interpretation);
  if (Evidence.Confidence.length === 1 && Evidence.Confidence[0] === 'Direct') pForm.prefillEmptyItem('1813531463','Proper');
  //ID:943235084	Type:PARAGRAPH_TEXT	Title:Mapping Assumptions
  pForm.prefillItem('943235084' ,Evidence.Assumptions);
  //ID:1114795606	Type:PARAGRAPH_TEXT	Title:Presynaptic Search Query
  pForm.prefillItem('1114795606',(Evidence.AutomationPre === '')? 'Neurotransmitter: AND Morphology:(Dendrites: AND Axons: AND Soma:)':Evidence.AutomationPre);
  //ID:877026955	Type:PARAGRAPH_TEXT	Title:Postsynaptic Search Query
  pForm.prefillItem('877026955',(Evidence.AutomationPost === '')? 'Morphology:(Dendrites: AND Axons: AND Soma:)':Evidence.AutomationPost);
  //ID:812232442	Type:GRID	Title:Connections List
  pForm.setChoices('812232442',Evidence.PConnections);
  pForm.prefillItem('812232442',Evidence.Confidence,'Low');
  
  //ID:375915292	Type:TEXT	Title:Based on Microscopy Evidence Synapses are
  pForm.prefillItem('375915292' ,Evidence.MicroscopyCType);
  //ID:375915292	Type:TEXT	Title:Based on Electrophysiology Evidence Synapses are
  pForm.prefillItem('1672352722',Evidence.ePhysCType);
  //ID:560176783	Type:TEXT	Title:Connectivity Ratios
  pForm.prefillItem('560176783',Evidence.ConRatios);
  //ID:156587527	Type:TEXT	Title:Cell Type Ratios
  pForm.prefillItem('156587527',Evidence.CellRatios);
  //ID:85038446	Type:PARAGRAPH_TEXT	Title:Other notes
  pForm.prefillItem('85038446',Evidence.Notes);
  
  //----------------------Covariates--------------------------------------------------------
  
  //ID:1693269062	Type:PARAGRAPH_TEXT	Title:Reference IDs
  pForm.prefillItem('1693269062',sortIDsAsSSV(Evidence.CovariatesIDs));
  //ID:1093425014	Type:CHECKBOX	Title:GABA or Glutamate receptors (ant)agonists
  pForm.setChoices('1093425014', Covariates.DrugsGABAGlutamate.split(/\s*[,;]+\s*/));
  if (Evidence.Drugs.length != 0) pForm.prefillItem('1093425014',Evidence.Drugs);
  //ID:2058479121	Type:MULTIPLE_CHOICE	Title:Extracellular Solution
  pForm.setChoices('2058479121',Covariates.ExtracellularBathSolution
                   .split(/\s*;\s*/).filter(onlyUniqueNonNull)
                   .map(function(solution){return 'Bath@'+solution})
                   .concat(Covariates.ExtracellularPipetteSolution.split(/\s*;\s*/)
                           .filter(onlyUniqueNonNull)
                           .map(function(solution){return 'Pipette@'+solution}))
                   .sort());
  pForm.prefillItem('2058479121',Evidence.ExtracellularSolution.split(/\s*;+\s*/g).filter(onlyUniqueNonNull).sort());
  //var checkBoxValidation = FormApp.createCheckboxValidation().setHelpText("Select two condiments.").requireSelectExactly(2).build();
  
  //ID:1364258333   Type:MULTIPLE_CHOICE    Title:Intracellular Solution
  pForm.setChoices('1364258333',Covariates.IntracellularPipetteSolution.split(/\s*;\s*/).filter(onlyUniqueNonNull).sort());
  pForm.prefillItem('1364258333',Evidence.IntracellularSolution.split(/\s*;+\s*/g).filter(onlyUniqueNonNull));
  
  //ID:701084432	Type:CHECKBOX	Title:Recorded Signal Type
  pForm.prefillItem('701084432',Evidence.dSec.split(/\s*[,;]+\s*/g));

  //ID:530154900	Type:TEXT	Title:Holding Potential or Steady State Membrane Potential (mV)
  pForm.prefillItem('530154900',Evidence.RMPorVh);
  pForm.prefillEmptyItem('530154900',(Covariates.PostsynVm.length === 0) ? '' : Covariates.PostsynVm);
  
  //ID:691790082    Type:TEXT   Title:Calculated Reversal Potential (mV)
  pForm.prefillItem('691790082',dash2null(Evidence.ErevCalculated));
  
  //ID:1673109528	Type:TEXT	Title:Experimental Reversal Potential (mV)
  pForm.prefillItem('1673109528',Evidence.ErevAuthors);
  pForm.prefillEmptyItem('1673109528',(Covariates.SynReversalPotential.length === 0) ? '' : Covariates.SynReversalPotential);
  
  //----------------------Morphology--------------------------------------------------------
  
  //ID:2122294445	Type:PARAGRAPH_TEXT	Title:Presynaptic
  pForm.prefillItem('2122294445',sortIDsAsSSV(Evidence.MorphologyIDsPre));
  //ID:83198848	Type:PARAGRAPH_TEXT	Title:Postsynaptic
  pForm.prefillItem('83198848',sortIDsAsSSV(Evidence.MorphologyIDsPost));

  //----------------------Biomarkers--------------------------------------------------------
  
  //ID:908652486	Type:PARAGRAPH_TEXT	Title:Presynaptic
  pForm.prefillItem('908652486',sortIDsAsSSV(Evidence.MarkersIDsPre));
  //ID:1478469428	Type:PARAGRAPH_TEXT	Title:Postsynaptic
  pForm.prefillItem('1478469428',sortIDsAsSSV(Evidence.MarkersIDsPost));

  //----------------------Cell Electrophysiology--------------------------------------------
  
  //ID:503459476	Type:PARAGRAPH_TEXT	Title:Presynaptic
  pForm.prefillItem('503459476',sortIDsAsSSV(Evidence.CellePhysIDsPre));
  //ID:628210084	Type:PARAGRAPH_TEXT	Title:Postsynaptic
  pForm.prefillItem('628210084',sortIDsAsSSV(Evidence.CellePhysIDsPost));

  //----------------------Firing Patterns---------------------------------------------------
  //ID:126071277	Type:PARAGRAPH_TEXT	Title:Presynaptic
  pForm.prefillItem('126071277',sortIDsAsSSV(Evidence.FiringPatternIDsPre));
  //ID:2058029950	Type:PARAGRAPH_TEXT	Title:Postsynaptic
  pForm.prefillItem('2058029950',sortIDsAsSSV(Evidence.FiringPatternIDsPost));

  //----------------------Connection Probability and Cell Type Ratios-----------------------
  //ID:1015974164	Type:PARAGRAPH_TEXT	Title:Presynaptic
  pForm.prefillItem('1015974164',sortIDsAsSSV(Evidence.ConnectivityIDsPre));
  //ID:17441795	    Type:PARAGRAPH_TEXT	Title:Postsynaptic
  //pForm.prefillItem('17441795',sortIDsAsSSV(Evidence.ConnectivityIDsPost));

  //----------------------Synaptic Data-----------------------------------------------------
  
  //ID:126234543	Type:PARAGRAPH_TEXT	Title:Reference IDs
  pForm.prefillItem('126234543',sortIDsAsSSV(Evidence.DataIDs));
  //ID:375531957	Type:GRID	        Title:Available Data
  pForm.prefillItem('375531957',[(Number(Evidence.Amplitude    ) === 1)? 'Yes' : 'No',
                                 (Number(Evidence.Kinetics     ) === 1)? 'Yes' : 'No',
                                 (Number(Evidence.ST_Plasticity) === 1)? 'Yes' : 'No',
                                 (Number(Evidence.LT_Plasticity) === 1)? 'Yes' : 'No']);
  //ID:977930606	Type:PARAGRAPH_TEXT	Title:Data Location
  pForm.prefillItem('977930606',Evidence.DataLocation);
  // submit the an action function on pressing the submit button
  //DeleteTriggers();
  // addTrigger(form)

  return pForm.getPrefilledUrl();
};

// Use this function to save the responses in the spreadsheet
function formSubmitAction(e) {
//  var Responses = e.response.getItemResponses();
//  var comment = Responses[0].getResponse();
//  var name    = Responses[1].getResponse();
//  var email   = Responses[2].getResponse();
  getTheLastFormResponse(e);
};
function deletePreviousTriggers() {
  var allTriggers = ScriptApp.getProjectTriggers();
  allTriggers.filter (function(triger){return triger.getHandlerFunction() === 'formSubmitAction'})
             .forEach(function(triger){return ScriptApp.deleteTrigger(triger)});
};

function addTrigger(form) {
  ScriptApp.newTrigger('formSubmitAction').forForm(form).onFormSubmit().create();
}