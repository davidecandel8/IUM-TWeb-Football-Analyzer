import { year } from "./games_data";

export const inputStyle = {
    input: [
      "text-white",
      "placeholder:text-sm placeholder:text-gray-400",
      'text-md',
      'text-center',
      'italic'
    ],
    inputWrapper: 'bg-grey3 border-2 border-grey1', 
    
}
  
  export const selectStyle = {
     label: 'text-sm text-gray-400 italic',
     itemClasses: {
        base: [
          "text-white",
        ]
     },
     trigger: 'bg-grey3 border-2 border-grey1'
  }

  export const inputStyleChat = {
    input: [
      "text-white",
      "placeholder:text-sm placeholder:text-gray-400",
      'text-md',
      'text-left',
      'italic'
    ],
    inputWrapper: 'bg-grey3 border-2 border-grey1', 
    
}

export const formatClubName = (clubName) => {
  if(clubName) return clubName.split(/\(-|\( -/)[0].trim();
}

export const formatMillions = (value) => {
  return `€${(value / 1000000).toFixed(2)}m`;
}

export const capitalizeString = (string) => string.split(/-|_/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')

export const capitalizeCompetitionName = (competition_name) => competition_name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')

export const club_img = club_id => "https://tmssl.akamaized.net/images/wappen/head/" + club_id + ".png"

export const competition_img = competition_id => "https://tmssl.akamaized.net/images/logo/header/" + competition_id.toLowerCase() + ".png"

export const formatSeasonYear = year => `${year}/${parseInt(year) + 1}`
