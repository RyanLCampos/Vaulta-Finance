import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const AccountSelector = ({ selectedAccount, setSelectedAccount, accounts }) => {
    const handleChange = (event) => {
        setSelectedAccount(event.target.value);
    };

    return (
        <div className="w-[90%] mx-auto">
            <div className="mb-4 md:w-[20%] md:ml-0">
                <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel
                        sx={{
                            color: "white",
                            "&.Mui-focused": { color: "#fff" },
                        }}
                    >
                        Conta
                    </InputLabel>
                    <Select
                        value={selectedAccount}
                        label="Conta"
                        onChange={handleChange}
                        sx={{
                            borderRadius: 2,
                            textAlign: "left",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#fff",
                                borderWidth: 2,
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#fff",
                                borderWidth: 2,
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#fff",
                                borderWidth: 2,
                            },
                            color: "#fff",
                            "& .MuiSelect-icon": {
                                color: "#fff",
                                fontSize: 24, 
                            },
                            fontSize: 14,
                            minHeight: 40,
                        }}
                    >
                        {accounts.map((acc) => (
                            <MenuItem key={acc.value} value={acc.value}>
                                {acc.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default AccountSelector;
