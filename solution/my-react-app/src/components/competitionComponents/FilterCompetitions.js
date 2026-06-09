import React from 'react';
import { Input, Button, Select, SelectItem, Avatar } from '@nextui-org/react';
import { MdClear } from 'react-icons/md';
import { inputStyle, selectStyle } from '../../utils/commons';
import { NAME, COUNTRY, TYPE } from '../../hooks/useFetchCompetitions';
import { typesFormatted } from '../../utils/types';
import { countries } from '../../utils/country';
import { capitalizeCompetitionName } from '../../utils/commons';
import { useParams} from 'react-router';

function FilterCompetitions({ handleFilterChange, resetFilters, competitionName, country, type, reset }) {
  const { paramCompName } = useParams();
  console.log(paramCompName)
  return (
    <div className="flex flex-row justify-center gap-4 items-center">
      <Input
        value={!paramCompName ? competitionName : capitalizeCompetitionName(paramCompName)} // Mostra ciò che l'utente ha digitato
        className="w-[300px] h-[50px]"
        classNames={inputStyle}
        color="success"
        variant="faded"
        radius="full"
        placeholder="Search by Competition Name"
        onValueChange={(value) => handleFilterChange({ value: value, type: NAME })}
      />

      <Select
        className="w-[300px] h-[50px]"
        classNames={{
          ...selectStyle,
          selectorIcon: 'text-white',
        }}
        color="success"
        variant="faded"
        radius="full"
        label="Search by Country"
        renderValue={([item]) => {
          return <p className="text-white">{item?.textValue}</p>;
        }}
        selectedKeys={country ? [country] : []}
        onChange={(e) => {
          handleFilterChange({ value: e.target.value, type: COUNTRY });
        }}
        items={countries}
      >
        {({ name, competition_id, country_id }) => (
          <SelectItem key={name} value={name} startContent={<Avatar alt="Country Logo" className="w-6 h-6" src={`https://tmssl.akamaized.net/images/flagge/headerRund/${country_id}.png`} />}>
            {name}
          </SelectItem>
        )}
      </Select>

      <Select
        className="w-[300px] h-[50px]"
        classNames={{
          ...selectStyle,
          selectorIcon: 'text-white',
        }}
        color="success"
        variant="faded"
        radius="full"
        label="Search by Type"
        renderValue={([item]) => {
          return <p className="text-white">{item?.textValue}</p>;
        }}
        selectedKeys={type ? [type] : []}
        onChange={(e) => {
          handleFilterChange({ value: e.target.value, type: TYPE });
        }}
        items={typesFormatted}
      >
        {({ name, id }) => (
          <SelectItem key={id} value={name}>
            {name}
          </SelectItem>
        )}
      </Select>

      <Button isDisabled={reset} className="h-[55px] bg-myGreen" variant="solid" radius="full" onClick={resetFilters}>
        Clear Filters<MdClear />
      </Button>
    </div>
  );
}

export default FilterCompetitions;
