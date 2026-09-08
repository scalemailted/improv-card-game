/* Example availability only. Saved policy IDs remain compatible with older
 * exercises; no coaching text generator or inference runtime is present. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.IMPROMPT_HINT_BIBLE=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const DEFAULT_HINT_POLICY='full';
  const policies = [
    {
      id: "full",
      label: "Examples available",
      shortLabel: "Examples",
      description: "Single-card scenes and complete pair scenes are available immediately.",
      allowsSingle: true,
      allowsCombination: true,
      allowsDepth: true,
      requiresUnlock: false
    },
    {
      id: "nudges",
      label: "Short scenes only",
      shortLabel: "Short scenes",
      description: "Only three-turn A–B–A examples are shown. No five-turn scenes or coaching text.",
      allowsSingle: true,
      allowsCombination: true,
      allowsDepth: false,
      requiresUnlock: false
    },
    {
      id: "after-attempt",
      label: "After first attempt",
      shortLabel: "After an attempt",
      description: "Hints stay locked until the player deliberately marks that they have tried the cards once.",
      allowsSingle: true,
      allowsCombination: true,
      allowsDepth: true,
      requiresUnlock: true
    },
    {
      id: "off",
      label: "Hints off",
      shortLabel: "Hints off",
      description: "No card or combination hints appear during this exercise. The Scene Craft Guide remains available.",
      allowsSingle: false,
      allowsCombination: false,
      allowsDepth: false,
      requiresUnlock: false
    }
  ];

  const policyById = Object.freeze(Object.fromEntries(policies.map((policy) => [policy.id, policy])));


function normalizePolicy(value){return Object.prototype.hasOwnProperty.call(policyById,value)?value:DEFAULT_HINT_POLICY;}
function getPolicy(value){return policyById[normalizePolicy(value)];}
for(const policy of policies)Object.freeze(policy);Object.freeze(policies);
return Object.freeze({DEFAULT_HINT_POLICY,policies,policyById,normalizePolicy,getPolicy});
});
