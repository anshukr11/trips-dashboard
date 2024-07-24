import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export default function Dropdown({ name, label, value, onChange, sx, dropdownLists, ...props}: any) {
  return (
    <FormControl margin="normal" sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
          {dropdownLists.map((item: string) => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
          ))}
      </Select>
  </FormControl>
  )
}
