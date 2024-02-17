import { useState } from 'react';
import { Autocomplete, Input, Paper, ListItem, Divider, Text } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

const SearchBar = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => { // Make this fetchSubjects as the subjects will be the suggestions
    const response = await fetch(`http://localhost:3000/subject-registration/${username}/${query}`); // Change this to a more suited route
    const data = await response.json();
    return data.suggestions;
  };

  const handleSearchChange = async (value) => {
    setSearchValue(value);
    navigate(`/subject-registration/${username}/${query}`); // Change to a more suited route. Idea is to navigate on change to trigger fetch
    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }
    const suggestions = await fetchSuggestions(value);
    setSuggestions(suggestions);
  };

  return (
    <Autocomplete
      value={searchValue}
      onChange={handleSearchChange}
      clearable
      transition="pop"
      placeholder="Start typing to search..."
      inputComponent={Input}
      paperComponent={Paper}
      itemComponent={({ value, ...others }) => (
        <>
          <ListItem {...others} component="button">
            <Text>{value}</Text>
          </ListItem>
          <Divider />
        </>
      )}
      items={suggestions}
      noValueLabel="Start typing to search..."
    />
  );
};

export default SearchBar;