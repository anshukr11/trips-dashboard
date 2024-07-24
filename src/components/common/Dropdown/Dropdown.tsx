import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export default function Dropdown({ name, label, value, onChange, sx, ...props}: any) {
  const dropdownItems = ['Booked', 'In Transit', 'Reached Destination', 'Delivered' ]
  return (
    <FormControl margin="normal" sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
          {dropdownItems.map(item => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
          ))}
      </Select>
  </FormControl>
  )
}
