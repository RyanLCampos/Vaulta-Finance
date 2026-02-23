import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const PeriodSelector = ({ period, setPeriod }) => {
    const handleChange = (event) => {
        setPeriod(event.target.value);
    };

    return (
        <>
            <div className="w-[90%] mx-auto md:hidden mb-4">
                <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel
                        id="period-select-label"
                        sx={{
                            color: "white",            
                            "&.Mui-focused": {
                                color: "white",     
                            },
                            scale: 1
                        }}
                    >
                        Período
                    </InputLabel>
                    <Select
                        labelId="period-select-label"
                        id="period-select"
                        value={period}
                        label="Período"
                        onChange={handleChange}
                        sx={{
                            borderRadius: 2,                 
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#E5E7EB",      
                                borderWidth: 2,
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#D1D5DB",       
                                borderWidth: 2,
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#ffffff",       
                                borderWidth: 2,
                            },
                            color: "#ffffff",                
                            "& .MuiSelect-icon": {
                                color: "#ffffff", 
                                fontSize: 28,     
                            }
                        }}
                    >
                        <MenuItem value="daily">Diário</MenuItem>
                        <MenuItem value="weekly">Semanal</MenuItem>
                        <MenuItem value="monthly">Mensal</MenuItem>
                        <MenuItem value="yearByYear">Anual</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="w-[90%] mx-auto hidden md:flex flex-wrap gap-2 justify-center md:justify-start">
                {[
                    { key: "daily", label: "Diário" },
                    { key: "weekly", label: "Semanal" },
                    { key: "monthly", label: "Mensal" },
                    { key: "yearByYear", label: "Anual" },
                ].map((p) => (
                    <button
                        key={p.key}
                        onClick={() => setPeriod(p.key)}
                        className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${period === p.key
                            ? "bg-white text-primary shadow-md"
                            : "text-white hover:bg-white hover:text-primary"
                            }`}
                    >
                        {p.label}
                    </button>
                ))}
            </div>
        </>
    );
};

export default PeriodSelector;
