# Unused Media Files Audit Report

**Generated on:** 2026-09-19  
**Target Directory:** `Frontend/public` (and `Frontend/src`)  

---

## 1. Executive Summary

| Metric | Count / Size | Percentage |
| :--- | :--- | :--- |
| **Total Media Files Found** | **136** | 100% |
| **Used Media Files** (in active code) | **68** (26.69 MB) | 9.1% space |
| **Unused Media Files** (ready to move/delete) | **68** (265.21 MB) | **90.9% space** |
| **Total Storage Space Recoverable** | **265.21 MB** | **90.9%** |

> [!NOTE]
> **Why are these files unused?**
> All 68 unused media files are the original `.png`, `.jpg`, `.gif`, and `.mp4` source assets that were previously converted to modern optimized formats (`.webp` and `.webm`).
> The codebase (`Frontend/src` and `index.html`) exclusively references the 68 optimized `.webp` and `.webm` files. None of the original 68 files are referenced or loaded anywhere in the application.

---

## 2. Unused Media Files (Grouped by Folder)

### public (root) (9 files — 38.64 MB)

| # | File Path | File Size | Active Replacement Used in Code |
| :--- | :--- | :--- | :--- |
| 1 | `public/AboutUs-Image.png` | 1.67 MB | `AboutUs-Image.webp` |
| 2 | `public/Capabilities.png` | 1.72 MB | `Capabilities.webp` |
| 3 | `public/Cordinationmodelgif.gif` | 7.22 MB | `Cordinationmodelgif.webm` |
| 4 | `public/HeroPage-Video.mp4` | 6.49 MB | `HeroPage-Video.webm` |
| 5 | `public/HeroPage-VideoForPhone.mp4` | 8.54 MB | `HeroPage-VideoForPhone.webm` |
| 6 | `public/Network-Image.png` | 1.41 MB | `Network-Image.webp` |
| 7 | `public/Solvoka_Hero.mp4` | 10.75 MB | `Solvoka_Hero.webm` |
| 8 | `public/official-logo.png` | 454.0 KB | `official-logo.webp` |
| 9 | `public/solvoka-logo.png` | 414.3 KB | `solvoka-logo.webp` |

### public/Automotive-Assets (6 files — 15.65 MB)

| # | File Path | File Size | Active Replacement Used in Code |
| :--- | :--- | :--- | :--- |
| 1 | `public/Automotive-Assets/Car parts.png` | 1.97 MB | `Automotive-Assets/Car parts.webp` |
| 2 | `public/Automotive-Assets/Car video.mp4` | 4.98 MB | `Automotive-Assets/Car video.webm` |
| 3 | `public/Automotive-Assets/Tractor parts.png` | 2.31 MB | `Automotive-Assets/Tractor parts.webp` |
| 4 | `public/Automotive-Assets/Tractor video.mp4` | 4.20 MB | `Automotive-Assets/Tractor video.webm` |
| 5 | `public/Automotive-Assets/cta image.png` | 460.5 KB | `Automotive-Assets/cta image.webp` |
| 6 | `public/Automotive-Assets/hero image.png` | 1.74 MB | `Automotive-Assets/hero image.webp` |

### public/Gif-Assets (29 files — 181.34 MB)

| # | File Path | File Size | Active Replacement Used in Code |
| :--- | :--- | :--- | :--- |
| 1 | `public/Gif-Assets/Adobe Express - Video_Ready_Sheet_Cutting.gif` | 5.00 MB | `Gif-Assets/Adobe Express - Video_Ready_Sheet_Cutting.webm` |
| 2 | `public/Gif-Assets/CNC_Drilling_Machine_Video_Ready.gif` | 6.34 MB | `Gif-Assets/CNC_Drilling_Machine_Video_Ready.webm` |
| 3 | `public/Gif-Assets/CNC_Milling_Machine_Video_Ready.gif` | 5.76 MB | `Gif-Assets/CNC_Milling_Machine_Video_Ready.webm` |
| 4 | `public/Gif-Assets/CNC_Turning_Machine_Video_Ready.gif` | 5.85 MB | `Gif-Assets/CNC_Turning_Machine_Video_Ready.webm` |
| 5 | `public/Gif-Assets/DMLS_Video_Is_Ready_.gif` | 6.41 MB | `Gif-Assets/DMLS_Video_Is_Ready_.webm` |
| 6 | `public/Gif-Assets/Deburring_Video_Is_Ready_.gif` | 6.42 MB | `Gif-Assets/Deburring_Video_Is_Ready_.webm` |
| 7 | `public/Gif-Assets/Laser_Cutting_Video_Ready.gif` | 6.08 MB | `Gif-Assets/Laser_Cutting_Video_Ready.webm` |
| 8 | `public/Gif-Assets/Laser_metal_deposition_manufacture.gif` | 6.61 MB | `Gif-Assets/Laser_metal_deposition_manufacture.webm` |
| 9 | `public/Gif-Assets/Metal_3D_printing_process.gif` | 6.18 MB | `Gif-Assets/Metal_3D_printing_process.webm` |
| 10 | `public/Gif-Assets/Metal_binder_jetting_3D_printing.gif` | 7.51 MB | `Gif-Assets/Metal_binder_jetting_3D_printing.webm` |
| 11 | `public/Gif-Assets/Pneumatic_metal_forming_machine.gif` | 7.01 MB | `Gif-Assets/Pneumatic_metal_forming_machine.webm` |
| 12 | `public/Gif-Assets/Professional_welding_services_ma.gif` | 7.65 MB | `Gif-Assets/Professional_welding_services_ma.webm` |
| 13 | `public/Gif-Assets/Ring_Forging_Video_Available_Now.gif` | 5.75 MB | `Gif-Assets/Ring_Forging_Video_Available_Now.webm` |
| 14 | `public/Gif-Assets/Robotic_arm_manufacturing_metal.gif` | 8.46 MB | `Gif-Assets/Robotic_arm_manufacturing_metal.webm` |
| 15 | `public/Gif-Assets/Steel_Bar_Cooling_Video_Link.gif` | 6.47 MB | `Gif-Assets/Steel_Bar_Cooling_Video_Link.webm` |
| 16 | `public/Gif-Assets/Steel_Bar_Dipped_in_Water.gif` | 6.19 MB | `Gif-Assets/Steel_Bar_Dipped_in_Water.webm` |
| 17 | `public/Gif-Assets/Steel_Die_Casting_Video_Ready.gif` | 4.92 MB | `Gif-Assets/Steel_Die_Casting_Video_Ready.webm` |
| 18 | `public/Gif-Assets/Swiss CNC_machine_machining_metal_comp.gif` | 7.27 MB | `Gif-Assets/Swiss CNC_machine_machining_metal_comp.webm` |
| 19 | `public/Gif-Assets/Video_Link_CNC_Machine.gif` | 5.86 MB | `Gif-Assets/Video_Link_CNC_Machine.webm` |
| 20 | `public/Gif-Assets/Video_Link_Provided.gif` | 6.83 MB | `Gif-Assets/Video_Link_Provided.webm` |
| 21 | `public/Gif-Assets/Video_Link_Ready_Now_.gif` | 5.33 MB | `Gif-Assets/Video_Link_Ready_Now_.webm` |
| 22 | `public/Gif-Assets/Video_Link_Ready_Sheet_Metal.gif` | 6.40 MB | `Gif-Assets/Video_Link_Ready_Sheet_Metal.webm` |
| 23 | `public/Gif-Assets/Video_Ready_CNC_Machine.gif` | 5.96 MB | `Gif-Assets/Video_Ready_CNC_Machine.webm` |
| 24 | `public/Gif-Assets/Video_Ready_Closed_Die_Forging.gif` | 4.17 MB | `Gif-Assets/Video_Ready_Closed_Die_Forging.webm` |
| 25 | `public/Gif-Assets/Video_Ready_Plasma_Cutting.gif` | 5.39 MB | `Gif-Assets/Video_Ready_Plasma_Cutting.webm` |
| 26 | `public/Gif-Assets/Video_of_Steel_Rod_Ready.gif` | 6.74 MB | `Gif-Assets/Video_of_Steel_Rod_Ready.webm` |
| 27 | `public/Gif-Assets/Video_on_Centrifugal_Casting.gif` | 7.84 MB | `Gif-Assets/Video_on_Centrifugal_Casting.webm` |
| 28 | `public/Gif-Assets/Video_on_Investment_Casting_Process.gif` | 6.54 MB | `Gif-Assets/Video_on_Investment_Casting_Process.webm` |
| 29 | `public/Gif-Assets/working_of_cnc_wire_edm_machine.gif` | 4.39 MB | `Gif-Assets/working_of_cnc_wire_edm_machine.webm` |

### public/cnc (3 files — 2.06 MB)

| # | File Path | File Size | Active Replacement Used in Code |
| :--- | :--- | :--- | :--- |
| 1 | `public/cnc/caliper-inspection.jpg` | 723.0 KB | `cnc/caliper-inspection.webp` |
| 2 | `public/cnc/flange-hub.jpg` | 723.0 KB | `cnc/flange-hub.webp` |
| 3 | `public/cnc/precision-manifold.jpg` | 666.0 KB | `cnc/precision-manifold.webp` |

### public/images/Material-Guide (1 files — 1.60 MB)

| # | File Path | File Size | Active Replacement Used in Code |
| :--- | :--- | :--- | :--- |
| 1 | `public/images/Material-Guide/MaterialGuide-HeroImage.png` | 1.60 MB | `images/Material-Guide/MaterialGuide-HeroImage.webp` |

### public/images/QualityPage (1 files — 1.63 MB)

| # | File Path | File Size | Active Replacement Used in Code |
| :--- | :--- | :--- | :--- |
| 1 | `public/images/QualityPage/QualityPage-HeroImage.png` | 1.63 MB | `images/QualityPage/QualityPage-HeroImage.webp` |

### public/images/casting (7 files — 5.50 MB)

| # | File Path | File Size | Active Replacement Used in Code |
| :--- | :--- | :--- | :--- |
| 1 | `public/images/casting/aluminum-casting.jpg` | 872.0 KB | `images/casting/aluminum-casting.webp` |
| 2 | `public/images/casting/cad-blueprint.jpg` | 793.6 KB | `images/casting/cad-blueprint.webp` |
| 3 | `public/images/casting/centrifugal-casting.jpg` | 904.2 KB | `images/casting/centrifugal-casting.webp` |
| 4 | `public/images/casting/die-casting.jpg` | 806.7 KB | `images/casting/die-casting.webp` |
| 5 | `public/images/casting/investment-casting.jpg` | 642.0 KB | `images/casting/investment-casting.webp` |
| 6 | `public/images/casting/materials.jpg` | 720.0 KB | `images/casting/materials.webp` |
| 7 | `public/images/casting/sand-casting.jpg` | 892.6 KB | `images/casting/sand-casting.webp` |

### public/images/forging (4 files — 3.07 MB)

| # | File Path | File Size | Active Replacement Used in Code |
| :--- | :--- | :--- | :--- |
| 1 | `public/images/forging/closed-die.jpg` | 897.7 KB | `images/forging/closed-die.webp` |
| 2 | `public/images/forging/hero.jpg` | 961.1 KB | `images/forging/hero.webp` |
| 3 | `public/images/forging/ring-forging.jpg` | 879.1 KB | `images/forging/ring-forging.webp` |
| 4 | `public/images/forging/tolerance-pin.jpg` | 403.1 KB | `images/forging/tolerance-pin.webp` |

### public/images/sheetmetal (1 files — 974.8 KB)

| # | File Path | File Size | Active Replacement Used in Code |
| :--- | :--- | :--- | :--- |
| 1 | `public/images/sheetmetal/cta-parts.jpg` | 974.8 KB | `images/sheetmetal/cta-parts.webp` |

### public/images/sheetmetal/materials (4 files — 3.31 MB)

| # | File Path | File Size | Active Replacement Used in Code |
| :--- | :--- | :--- | :--- |
| 1 | `public/images/sheetmetal/materials/aluminum.jpg` | 872.0 KB | `images/sheetmetal/materials/aluminum.webp` |
| 2 | `public/images/sheetmetal/materials/mild-steel.jpg` | 892.6 KB | `images/sheetmetal/materials/mild-steel.webp` |
| 3 | `public/images/sheetmetal/materials/stainless-steel.jpg` | 904.2 KB | `images/sheetmetal/materials/stainless-steel.webp` |
| 4 | `public/images/sheetmetal/materials/thickness-grid.jpg` | 723.0 KB | `images/sheetmetal/materials/thickness-grid.webp` |

### public/qualitypreview-gifassets (3 files — 11.47 MB)

| # | File Path | File Size | Active Replacement Used in Code |
| :--- | :--- | :--- | :--- |
| 1 | `public/qualitypreview-gifassets/CMM_probe_inspecting_metallic_part_orig.gif` | 3.16 MB | `qualitypreview-gifassets/CMM_probe_inspecting_metallic_part_orig.webm` |
| 2 | `public/qualitypreview-gifassets/Factory_metal_cylinders_checklist_orig.gif` | 2.86 MB | `qualitypreview-gifassets/Factory_metal_cylinders_checklist_orig.webm` |
| 3 | `public/qualitypreview-gifassets/Machines_packing_parts_in_crate_orig.gif` | 5.45 MB | `qualitypreview-gifassets/Machines_packing_parts_in_crate_orig.webm` |

---

## 3. Storage Savings Breakdown by Folder

| Folder | Unused File Count | Space to Free |
| :--- | :--- | :--- |
| `public/Gif-Assets` | 29 files | **181.34 MB** |
| `public (root)` | 9 files | **38.64 MB** |
| `public/Automotive-Assets` | 6 files | **15.65 MB** |
| `public/qualitypreview-gifassets` | 3 files | **11.47 MB** |
| `public/images/casting` | 7 files | **5.50 MB** |
| `public/images/sheetmetal/materials` | 4 files | **3.31 MB** |
| `public/images/forging` | 4 files | **3.07 MB** |
| `public/cnc` | 3 files | **2.06 MB** |
| `public/images/QualityPage` | 1 files | **1.63 MB** |
| `public/images/Material-Guide` | 1 files | **1.60 MB** |
| `public/images/sheetmetal` | 1 files | **974.8 KB** |
| **Total** | **68 files** | **265.21 MB** |

---

## 4. Next Steps (Pending User Confirmation)

1. **Confirmation:** User will review this report.
2. **Safe Move (Backup):** Upon receiving confirmation ("haan delete karo"), all 68 unused files will be moved (not permanently deleted) to a safe backup directory: `c:\Users\Govind\Desktop\Solvoka\unused-media-backup/` preserving directory structure.
3. **Build Validation:** Run `npm run build` in `Frontend/` to confirm zero broken imports/build errors.
4. **Retention:** The backup folder can be kept for 2 weeks before permanent deletion.