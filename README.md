# Aquifer Lens: Groundwater Trend Detective for Saudi Arabia

NASA Space Apps Challenge 2026 entry for **Be An Earth System Trend Detective!**

Is a region gaining or losing water, and is the trend real? Aquifer Lens pulls NASA
GRACE/GRACE-FO satellite gravity data (monthly total water storage, April 2002 to September 2026),
charts the time series for a region you pick, removes the seasonal cycle, and tests the
trend's significance with the Mann-Kendall test and Sen's slope.

## Run it

Open `Aquifer_Lens.ipynb` in Google Colab and choose Runtime -> Run all. The GRACE download uses a
free [NASA Earthdata](https://urs.earthdata.nasa.gov/) account; everything else needs no login.
Analysis code and data sources are open.

Region presets: whole Saudi Arabia, Saq/Disi aquifer, Al-Ahsa, Wadi As-Sirhan - or set your
own lat/lon box.

## NASA data used

- JPL GRACE and GRACE-FO Mascon Water Height (RL06.3 v04), NASA PO.DAAC - primary dataset
- GISS Surface Temperature Analysis (GISTEMP v4), NASA GISS - no-login demonstration example
- GLDAS Noah Land Surface Model, NASA GES DISC - monthly soil moisture 0-2 m (April 2002 - July 2026), used for the soil-moisture check and a derived groundwater proxy
- GPM IMERG Final Precipitation L3 monthly V07 (DOI 10.5067/GPM/IMERG/3B-MONTH/07) - rain context layer
- MODIS/Terra Vegetation Indices Monthly L3 (MOD13C2 V061, DOI 10.5067/MODIS/MOD13C2.061) - greenness (NDVI) context layer
- SMAP L3 Radiometer Global Daily 36 km Soil Moisture V009 (SPL3SMP, DOI 10.5067/OK8NL42F0B4O) - surface soil moisture context layer (monthly 15th-day morning sample, April 2015 to October 2026)
- MODIS/Terra+Aqua Land Cover Type Yearly L3 500m (MCD12Q1 V061, DOI 10.5067/MODIS/MCD12Q1.061) - cropland cover context layer (IGBP classes 12 + 14, % of land, 2002-2025; coarse in arid areas)
- MODIS/Terra Net Evapotranspiration Gap-Filled Yearly L4 500m (MOD16A3GF V061, DOI 10.5067/MODIS/MOD16A3GF.061) - evapotranspiration context layer (yearly, 2002-2025; MOD16 overestimates ET over bare desert)

## Method

1. Area-weighted regional mean of monthly mascon water storage (cm)
2. Seasonal cycle removal (monthly climatology)
3. Mann-Kendall significance test + Sen's slope (cm/yr), with OLS and autocorrelation-corrected (Hamed-Rao) cross-checks
4. Per-grid-cell trend map over the Arabian Peninsula

## Soil moisture check (GLDAS)

Saudi analysis box, April 2002 - July 2026 (257 months), deseasonalized Sen slopes:
GRACE total water storage -0.73 cm/yr; GLDAS soil moisture (0-2 m) +0.10 cm/yr; derived groundwater
proxy (total storage minus soil moisture) -0.83 cm/yr. The proxy is derived, not measured. GLDAS is a model.

## Interactive portal

Arabic / English map and dropdowns: https://bassemhamdyhamed.github.io/aquifer-lens/
Layers: storage, rain, greenness. (Map UX inspired by geemap / leafmap, Qiusheng Wu, MIT; no code copied.)

## Context layers (rain and greenness)

Monthly regional means for the Saudi box and the Saq/Disi, Qassim and Hail boxes. Trends use the same
method (deseasonalized Sen slope, Hamed-Rao corrected p). Saudi box: rain +0.084 mm/month per year
(p = 0.03); NDVI rising (p = 0.007); ET flat, no significant trend in any box (Saudi +0.48 mm/yr per year, p = 0.41); SMAP surface soil moisture shows no significant trend (Saudi p = 0.36); cropland cover rose slightly in the Saudi box (+0.0115 % of land per year, p = 0.016). These are context, not proof of pumping.

## Files in this repository

- `Aquifer_Lens.ipynb` - the whole analysis, Colab-ready
- `index.html`, `explorer.js`, `data.js`, `ctx.js`, `img1.js` to `img4.js` - the interactive portal (static, no server)
- `gldas_grace_saudi_monthly.csv` - monthly GRACE and GLDAS values, Saudi box
- `imerg_saudi_monthly.csv`, `ndvi_saudi_monthly.csv` - monthly rain and NDVI regional means
- `et_saudi_yearly.csv` - yearly MOD16 evapotranspiration regional means
- `cropland_saudi_yearly.csv` - yearly cropland cover, % of land
- `smap_saudi_monthly.csv` - monthly SMAP soil moisture samples (blank = no retrieval)

*Built with AI coding assistance, declared on the project page. All analysis runs on real
NASA data.*
