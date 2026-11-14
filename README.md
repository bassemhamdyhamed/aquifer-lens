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

Region presets: Saudi Arabia (bounding box; the country-mask result is in section 7b), Saq/Disi aquifer, Al-Ahsa, Wadi As-Sirhan - or set your
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

## Corrected trend results (gap-aware)

Some months are missing, so slopes are gap-aware Sen slopes: they use the real time between months, on deseasonalized anomalies. p-values are Mann-Kendall with the Hamed-Rao correction (approximate, because the months are not evenly spaced). Confidence intervals are rank-based and not adjusted for autocorrelation.

Saudi Arabia (country mask), April 2002 - September 2026 (259 GRACE months; 257 months common with GLDAS):
GRACE total water storage -0.62 cm/yr (CI -0.64 to -0.60, about -13.3 km3/yr); GLDAS soil moisture (0-2 m) +0.09 cm/yr; derived groundwater
proxy (total storage minus soil moisture) -0.71 cm/yr (about -15.2 km3/yr). The proxy is derived, not measured. GLDAS is a model.
A latitude-longitude box that includes the Red Sea gives a smaller trend (about -0.41 cm/yr), so Saudi Arabia is reported with a country mask.

Boxes (GRACE, cm/yr): Saq/Disi -1.18, Wadi As-Sirhan -1.04, Al-Ahsa -0.54. Net Saq/Disi change since 2002: -23.7 cm (last 24 vs first 24 available months).
The loss slowed after 2016 (2002-2016 vs 2018-2026): Saq/Disi -1.38 vs -0.54, Wadi As-Sirhan -1.20 vs -0.53, Al-Ahsa -0.66 vs -0.47, Saudi Arabia -0.77 vs -0.54.

## Interactive portal

Arabic / English map and dropdowns: https://bassemhamdyhamed.github.io/aquifer-lens/
Layers: storage, rain, greenness. (Map UX inspired by geemap / leafmap, Qiusheng Wu, MIT; no code copied.)

## Context layers (rain and greenness)

Monthly regional means for Saudi Arabia and the Saq/Disi, Qassim and Hail boxes. Rain for Saudi Arabia uses the country mask; the other layers (NDVI, ET, SMAP, cropland) use the Saudi box (16-32.5 N, 34.5-55.7 E). Trends use the same
method (deseasonalized Sen slope, Hamed-Rao corrected p). Saudi Arabia (country mask): rain +0.077 mm/month per year
(p = 0.005); Saudi box: NDVI rising (p = 0.007); ET flat, no significant trend in any box (Saudi +0.48 mm/yr per year, p = 0.41); SMAP surface soil moisture shows no significant trend (Saudi p = 0.36); cropland cover rose slightly in the Saudi box (+0.0115 % of land per year, p = 0.016). These are context, not proof of pumping.

## Files in this repository

- `Aquifer_Lens.ipynb` - the whole analysis, Colab-ready
- `index.html`, `explorer.js`, `data.js`, `ctx.js`, `img1.js` to `img4.js` - the interactive portal (static, no server)
- `gldas_grace_saudi_monthly.csv` - monthly GRACE and GLDAS values, Saudi Arabia (country mask)
- `imerg_saudi_monthly.csv`, `ndvi_saudi_monthly.csv` - monthly rain and NDVI regional means
- `et_saudi_yearly.csv` - yearly MOD16 evapotranspiration regional means
- `cropland_saudi_yearly.csv` - yearly cropland cover, % of land
- `smap_saudi_monthly.csv` - monthly SMAP soil moisture samples (blank = no retrieval)

*Built with AI coding assistance, declared on the project page. All analysis runs on real
NASA data.*
