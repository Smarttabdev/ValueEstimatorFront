import {httpService} from './http.service';

export const getValue = ({
   name,
   zip,
   email,
   phone,
   street,
   city,
   buildingType,
   builtYear,
   sqm,
   roomNumber,
   plot,
   condition,
   status,
   toCompany
}) => {
   return httpService.post('getvalue', {
      name,
      zip,
      email,
      phone,
      street,
      city,
      buildingType,
      builtYear,
      sqm,
      roomNumber,
      plot,
      condition,
      status,
      toCompany
   })
}

export const getCustomUi = ({company}) => {
   return httpService.post('get-custom-ui', {company})
}