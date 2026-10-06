import{t as e}from"./download-44arOsn1.js";import{_ as t,a as n,g as r,t as i,v as a}from"./index-CbEkuwnL.js";import{t as o}from"./button-BLjMhmjz.js";import{t as s}from"./input-oXZCWp76.js";var c=[{path:`.gitattributes`,content:`# Disable autocrlf on generated files, they always generate with LF
# Add any extra files or paths here to make git stop saying they
# are changed when only line endings change.
src/generated/**/.cache/cache text eol=lf
src/generated/**/*.json text eol=lf
`},{path:`.gitignore`,content:`# eclipse
bin
*.launch
.settings
.metadata
.classpath
.project

# idea
out
*.ipr
*.iws
*.iml
.idea

# gradle
build
.gradle

# other
eclipse
run
run-data
src/generated

# Files from Forge MDK
forge*changelog.txt
`},{path:`CHANGELOG.md`,content:`# Changelog

## 0.4.0 — 2026-10-06

### Added

- Player-scoped knowledge in SavedData schema 3: uuid, name, login count, last dimension, last seen day-time, online flag
- Written on login, logout, and dimension change. Cleared when the modpack fingerprint changes. Authored regions stay
- \`/worldforge player\`
- Loader mismatch catalog for magic mods whose 1.21 APIs are NeoForge, not Forge
- \`/worldforge compat\`
- \`src/optional-ars\` documents the refusal. It is **not** a Gradle source set and is not in the jar
- \`./gradlew explainOptionalArs\`

### Honesty

- Ars Nouveau 1.21.x (\`ArsNouveauAPI\`, \`net.neoforged\`) is not compiled in
- Iron's Spells Forge API is documented for 1.20.1 and below; the 1.21 line is NeoForge
- Both stay \`PARTIALLY_KNOWN\` with empty capabilities. No reflection scrape

## 0.3.0 — 2026-10-05

### Added

- Phase 7 magic framework: \`MagicSystem\`, \`MagicCapability\`, \`MagicSystemDescriptor\`, \`MagicCatalog\`
- Magic adapter records loaded targets as PARTIALLY_KNOWN and **refuses to bind** (no compiled third-party magic API)
- Phase 8 combat framework: vanilla \`Registries.DAMAGE_TYPE\` census, attribute registry, entity-category counts
- Combat adapter **binds vanilla** (\`boundTarget=minecraft\`). Apotheosis / Better Combat stay detected-only
- Public \`WorldForgeEventBus\` for other mods (\`WorldForge.api().eventBus()\`)
- Data-driven adapter descriptors under \`data/worldforge/adapters/*.json\`
- \`/worldforge magic\`
- \`/worldforge combat\`
- \`/worldforge bus\`
- \`/worldforge descriptors\`

### Honesty

- Binding the combat adapter does not mark extra combat mods KNOWN
- Magic capabilities stay empty until an isolated optional module compiles against a documented API
- Event-bus subscribers that throw never abort WorldForge

## 0.2.0 — 2026-09-28

### Added

- Phase 6 world systems: dimension snapshot, authored regions, points of interest, pack-authored world events
- Persistent regions and POIs in SavedData (schema 2)
- \`/worldforge world\`
- \`/worldforge region list|here\`
- \`/worldforge poi list|here\`
- \`/worldforge event list|<type> <payload>\`

### Notes

- Regions are never discovered by scanning chunks
- World events are ephemeral; geography persists across restarts
- A modpack fingerprint change still clears integration state, not authored geography

## 0.1.0 — 2026-09-25

### Added

- Phase 1–5 foundation for Minecraft 1.21.1 / Forge 52.1.0
- Mod discovery from Forge loader metadata
- One-shot Forge and datapack registry census
- Knowledge classification: KNOWN / PARTIALLY_KNOWN / UNKNOWN
- Persistent world knowledge with schema version and modpack fingerprint
- Integration manager with magic, combat, technology, quest, and worldgen adapters (detect-only)
- \`/worldforge status|discover|knowledge\`
- Common config for debug, discovery, integrations, and experimental features
`},{path:`CREDITS.txt`,content:`Minecraft Forge: Credits/Thank You

Forge is a set of tools and modifications to the Minecraft base game code to assist 
mod developers in creating new and exciting content. It has been in development for 
several years now, but I would like to take this time thank a few people who have 
helped it along its way.

First, the people who originally created the Forge projects way back in Minecraft 
alpha. Eloraam of RedPower, and SpaceToad of Buildcraft, without their acceptiance 
of me taking over the project, who knows what Minecraft modding would be today.

Secondly, someone who has worked with me, and developed some of the core features
that allow modding to be as functional, and as simple as it is, cpw. For developing
FML, which stabilized the client and server modding ecosystem. As well as the base
loading system that allows us to modify Minecraft's code as elegently as possible.

Mezz, who has stepped up as the issue and pull request manager. Helping to keep me
sane as well as guiding the community into creating better additions to Forge.

Searge, Bspks, Fesh0r, ProfMobious, and all the rest over on the MCP team {of which 
I am a part}. For creating some of the core tools needed to make Minecraft modding 
both possible, and as stable as can be.
  On that note, here is some specific information of the MCP data we use:
    * Minecraft Coder Pack (MCP) *
      Forge Mod Loader and Minecraft Forge have permission to distribute and automatically 
      download components of MCP and distribute MCP data files. This permission is not 
      transitive and others wishing to redistribute the Minecraft Forge source independently
      should seek permission of MCP or remove the MCP data files and request their users 
      to download MCP separately.
      
And lastly, the countless community members who have spent time submitting bug reports, 
pull requests, and just helping out the community in general. Thank you.

--LexManos

=========================================================================

This is Forge Mod Loader.

You can find the source code at all times at https://github.com/MinecraftForge/MinecraftForge/tree/1.12.x/src/main/java/net/minecraftforge/fml

This minecraft mod is a clean open source implementation of a mod loader for minecraft servers
and minecraft clients.

The code is authored by cpw.

It began by partially implementing an API defined by the client side ModLoader, authored by Risugami.
https://www.minecraftforum.net/topic/75440-
This support has been dropped as of Minecraft release 1.7, as Risugami no longer maintains ModLoader.

It also contains suggestions and hints and generous helpings of code from LexManos, author of MinecraftForge.
https://minecraftforge.net/

Additionally, it contains an implementation of topological sort based on that 
published at http://keithschwarz.com/interesting/code/?dir=topological-sort

It also contains code from the Maven project for performing versioned dependency
resolution. http://maven.apache.org/

It also contains a partial repackaging of the javaxdelta library from http://sourceforge.net/projects/javaxdelta/
with credit to it's authors.

Forge Mod Loader downloads components from the Minecraft Coder Pack
(http://mcp.ocean-labs.de/index.php/Main_Page) with kind permission from the MCP team.

`},{path:`LICENSE`,content:`MIT License

Copyright (c) 2026 SoloGam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`},{path:`LICENSE.txt`,content:`Unless noted below, Minecraft Forge, Forge Mod Loader, and all 
parts herein are licensed under the terms of the LGPL 2.1 found
here http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt and 
copied below.

Homepage: http://minecraftforge.net/
          https://github.com/MinecraftForge/MinecraftForge
          

A note on authorship:
All source artifacts are property of their original author, with
the exclusion of the contents of the patches directory and others
copied from it from time to time. Authorship of the contents of
the patches directory is retained by the Minecraft Forge project.
This is because the patches are partially machine generated
artifacts, and are changed heavily due to the way forge works.
Individual attribution within them is impossible.

Consent:
All contributions to Forge must consent to the release of any
patch content to the Forge project.

A note on infectivity:
The LGPL is chosen specifically so that projects may depend on Forge
features without being infected with its license. That is the 
purpose of the LGPL. Mods and others using this code via ordinary
Java mechanics for referencing libraries are specifically not bound
by Forge's license for the Mod code.


=== MCP Data ===
This software includes data from the Minecraft Coder Pack (MCP), with kind permission
from them. The license to MCP data is not transitive - distribution of this data by
third parties requires independent licensing from the MCP team. This data is not
redistributable without permission from the MCP team.

=== Sharing ===
I grant permission for some parts of FML to be redistributed outside the terms of the LGPL, for the benefit of
the minecraft modding community. All contributions to these parts should be licensed under the same additional grant.

-- Runtime patcher --
License is granted to redistribute the runtime patcher code (src/main/java/net/minecraftforge/fml/common/patcher
and subdirectories) under any alternative open source license as classified by the OSI (http://opensource.org/licenses)

-- ASM transformers --
License is granted to redistribute the ASM transformer code (src/main/java/net/minecraftforge/common/asm/ and subdirectories)
under any alternative open source license as classified by the OSI (http://opensource.org/licenses)

=========================================================================
This software includes portions from the Apache Maven project at
http://maven.apache.org/ specifically the ComparableVersion.java code. It is
included based on guidelines at
http://www.softwarefreedom.org/resources/2007/gpl-non-gpl-collaboration.html
with notices intact. The only change is a non-functional change of package name.

This software contains a partial repackaging of javaxdelta, a BSD licensed program for generating
binary differences and applying them, sourced from the subversion at http://sourceforge.net/projects/javaxdelta/
authored by genman, heikok, pivot.
The only changes are to replace some Trove collection types with standard Java collections, and repackaged.

This software includes the Monocraft font from https://github.com/IdreesInc/Monocraft/ for use in the early loading
display.
=========================================================================


                  GNU LESSER GENERAL PUBLIC LICENSE
                       Version 2.1, February 1999

 Copyright (C) 1991, 1999 Free Software Foundation, Inc.
 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

[This is the first released version of the Lesser GPL.  It also counts
 as the successor of the GNU Library Public License, version 2, hence
 the version number 2.1.]

                            Preamble

  The licenses for most software are designed to take away your
freedom to share and change it.  By contrast, the GNU General Public
Licenses are intended to guarantee your freedom to share and change
free software--to make sure the software is free for all its users.

  This license, the Lesser General Public License, applies to some
specially designated software packages--typically libraries--of the
Free Software Foundation and other authors who decide to use it.  You
can use it too, but we suggest you first think carefully about whether
this license or the ordinary General Public License is the better
strategy to use in any particular case, based on the explanations below.

  When we speak of free software, we are referring to freedom of use,
not price.  Our General Public Licenses are designed to make sure that
you have the freedom to distribute copies of free software (and charge
for this service if you wish); that you receive source code or can get
it if you want it; that you can change the software and use pieces of
it in new free programs; and that you are informed that you can do
these things.

  To protect your rights, we need to make restrictions that forbid
distributors to deny you these rights or to ask you to surrender these
rights.  These restrictions translate to certain responsibilities for
you if you distribute copies of the library or if you modify it.

  For example, if you distribute copies of the library, whether gratis
or for a fee, you must give the recipients all the rights that we gave
you.  You must make sure that they, too, receive or can get the source
code.  If you link other code with the library, you must provide
complete object files to the recipients, so that they can relink them
with the library after making changes to the library and recompiling
it.  And you must show them these terms so they know their rights.

  We protect your rights with a two-step method: (1) we copyright the
library, and (2) we offer you this license, which gives you legal
permission to copy, distribute and/or modify the library.

  To protect each distributor, we want to make it very clear that
there is no warranty for the free library.  Also, if the library is
modified by someone else and passed on, the recipients should know
that what they have is not the original version, so that the original
author's reputation will not be affected by problems that might be
introduced by others.
\f
  Finally, software patents pose a constant threat to the existence of
any free program.  We wish to make sure that a company cannot
effectively restrict the users of a free program by obtaining a
restrictive license from a patent holder.  Therefore, we insist that
any patent license obtained for a version of the library must be
consistent with the full freedom of use specified in this license.

  Most GNU software, including some libraries, is covered by the
ordinary GNU General Public License.  This license, the GNU Lesser
General Public License, applies to certain designated libraries, and
is quite different from the ordinary General Public License.  We use
this license for certain libraries in order to permit linking those
libraries into non-free programs.

  When a program is linked with a library, whether statically or using
a shared library, the combination of the two is legally speaking a
combined work, a derivative of the original library.  The ordinary
General Public License therefore permits such linking only if the
entire combination fits its criteria of freedom.  The Lesser General
Public License permits more lax criteria for linking other code with
the library.

  We call this license the "Lesser" General Public License because it
does Less to protect the user's freedom than the ordinary General
Public License.  It also provides other free software developers Less
of an advantage over competing non-free programs.  These disadvantages
are the reason we use the ordinary General Public License for many
libraries.  However, the Lesser license provides advantages in certain
special circumstances.

  For example, on rare occasions, there may be a special need to
encourage the widest possible use of a certain library, so that it becomes
a de-facto standard.  To achieve this, non-free programs must be
allowed to use the library.  A more frequent case is that a free
library does the same job as widely used non-free libraries.  In this
case, there is little to gain by limiting the free library to free
software only, so we use the Lesser General Public License.

  In other cases, permission to use a particular library in non-free
programs enables a greater number of people to use a large body of
free software.  For example, permission to use the GNU C Library in
non-free programs enables many more people to use the whole GNU
operating system, as well as its variant, the GNU/Linux operating
system.

  Although the Lesser General Public License is Less protective of the
users' freedom, it does ensure that the user of a program that is
linked with the Library has the freedom and the wherewithal to run
that program using a modified version of the Library.

  The precise terms and conditions for copying, distribution and
modification follow.  Pay close attention to the difference between a
"work based on the library" and a "work that uses the library".  The
former contains code derived from the library, whereas the latter must
be combined with the library in order to run.
\f
                  GNU LESSER GENERAL PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. This License Agreement applies to any software library or other
program which contains a notice placed by the copyright holder or
other authorized party saying it may be distributed under the terms of
this Lesser General Public License (also called "this License").
Each licensee is addressed as "you".

  A "library" means a collection of software functions and/or data
prepared so as to be conveniently linked with application programs
(which use some of those functions and data) to form executables.

  The "Library", below, refers to any such software library or work
which has been distributed under these terms.  A "work based on the
Library" means either the Library or any derivative work under
copyright law: that is to say, a work containing the Library or a
portion of it, either verbatim or with modifications and/or translated
straightforwardly into another language.  (Hereinafter, translation is
included without limitation in the term "modification".)

  "Source code" for a work means the preferred form of the work for
making modifications to it.  For a library, complete source code means
all the source code for all modules it contains, plus any associated
interface definition files, plus the scripts used to control compilation
and installation of the library.

  Activities other than copying, distribution and modification are not
covered by this License; they are outside its scope.  The act of
running a program using the Library is not restricted, and output from
such a program is covered only if its contents constitute a work based
on the Library (independent of the use of the Library in a tool for
writing it).  Whether that is true depends on what the Library does
and what the program that uses the Library does.

  1. You may copy and distribute verbatim copies of the Library's
complete source code as you receive it, in any medium, provided that
you conspicuously and appropriately publish on each copy an
appropriate copyright notice and disclaimer of warranty; keep intact
all the notices that refer to this License and to the absence of any
warranty; and distribute a copy of this License along with the
Library.

  You may charge a fee for the physical act of transferring a copy,
and you may at your option offer warranty protection in exchange for a
fee.
\f
  2. You may modify your copy or copies of the Library or any portion
of it, thus forming a work based on the Library, and copy and
distribute such modifications or work under the terms of Section 1
above, provided that you also meet all of these conditions:

    a) The modified work must itself be a software library.

    b) You must cause the files modified to carry prominent notices
    stating that you changed the files and the date of any change.

    c) You must cause the whole of the work to be licensed at no
    charge to all third parties under the terms of this License.

    d) If a facility in the modified Library refers to a function or a
    table of data to be supplied by an application program that uses
    the facility, other than as an argument passed when the facility
    is invoked, then you must make a good faith effort to ensure that,
    in the event an application does not supply such function or
    table, the facility still operates, and performs whatever part of
    its purpose remains meaningful.

    (For example, a function in a library to compute square roots has
    a purpose that is entirely well-defined independent of the
    application.  Therefore, Subsection 2d requires that any
    application-supplied function or table used by this function must
    be optional: if the application does not supply it, the square
    root function must still compute square roots.)

These requirements apply to the modified work as a whole.  If
identifiable sections of that work are not derived from the Library,
and can be reasonably considered independent and separate works in
themselves, then this License, and its terms, do not apply to those
sections when you distribute them as separate works.  But when you
distribute the same sections as part of a whole which is a work based
on the Library, the distribution of the whole must be on the terms of
this License, whose permissions for other licensees extend to the
entire whole, and thus to each and every part regardless of who wrote
it.

Thus, it is not the intent of this section to claim rights or contest
your rights to work written entirely by you; rather, the intent is to
exercise the right to control the distribution of derivative or
collective works based on the Library.

In addition, mere aggregation of another work not based on the Library
with the Library (or with a work based on the Library) on a volume of
a storage or distribution medium does not bring the other work under
the scope of this License.

  3. You may opt to apply the terms of the ordinary GNU General Public
License instead of this License to a given copy of the Library.  To do
this, you must alter all the notices that refer to this License, so
that they refer to the ordinary GNU General Public License, version 2,
instead of to this License.  (If a newer version than version 2 of the
ordinary GNU General Public License has appeared, then you can specify
that version instead if you wish.)  Do not make any other change in
these notices.
\f
  Once this change is made in a given copy, it is irreversible for
that copy, so the ordinary GNU General Public License applies to all
subsequent copies and derivative works made from that copy.

  This option is useful when you wish to copy part of the code of
the Library into a program that is not a library.

  4. You may copy and distribute the Library (or a portion or
derivative of it, under Section 2) in object code or executable form
under the terms of Sections 1 and 2 above provided that you accompany
it with the complete corresponding machine-readable source code, which
must be distributed under the terms of Sections 1 and 2 above on a
medium customarily used for software interchange.

  If distribution of object code is made by offering access to copy
from a designated place, then offering equivalent access to copy the
source code from the same place satisfies the requirement to
distribute the source code, even though third parties are not
compelled to copy the source along with the object code.

  5. A program that contains no derivative of any portion of the
Library, but is designed to work with the Library by being compiled or
linked with it, is called a "work that uses the Library".  Such a
work, in isolation, is not a derivative work of the Library, and
therefore falls outside the scope of this License.

  However, linking a "work that uses the Library" with the Library
creates an executable that is a derivative of the Library (because it
contains portions of the Library), rather than a "work that uses the
library".  The executable is therefore covered by this License.
Section 6 states terms for distribution of such executables.

  When a "work that uses the Library" uses material from a header file
that is part of the Library, the object code for the work may be a
derivative work of the Library even though the source code is not.
Whether this is true is especially significant if the work can be
linked without the Library, or if the work is itself a library.  The
threshold for this to be true is not precisely defined by law.

  If such an object file uses only numerical parameters, data
structure layouts and accessors, and small macros and small inline
functions (ten lines or less in length), then the use of the object
file is unrestricted, regardless of whether it is legally a derivative
work.  (Executables containing this object code plus portions of the
Library will still fall under Section 6.)

  Otherwise, if the work is a derivative of the Library, you may
distribute the object code for the work under the terms of Section 6.
Any executables containing that work also fall under Section 6,
whether or not they are linked directly with the Library itself.
\f
  6. As an exception to the Sections above, you may also combine or
link a "work that uses the Library" with the Library to produce a
work containing portions of the Library, and distribute that work
under terms of your choice, provided that the terms permit
modification of the work for the customer's own use and reverse
engineering for debugging such modifications.

  You must give prominent notice with each copy of the work that the
Library is used in it and that the Library and its use are covered by
this License.  You must supply a copy of this License.  If the work
during execution displays copyright notices, you must include the
copyright notice for the Library among them, as well as a reference
directing the user to the copy of this License.  Also, you must do one
of these things:

    a) Accompany the work with the complete corresponding
    machine-readable source code for the Library including whatever
    changes were used in the work (which must be distributed under
    Sections 1 and 2 above); and, if the work is an executable linked
    with the Library, with the complete machine-readable "work that
    uses the Library", as object code and/or source code, so that the
    user can modify the Library and then relink to produce a modified
    executable containing the modified Library.  (It is understood
    that the user who changes the contents of definitions files in the
    Library will not necessarily be able to recompile the application
    to use the modified definitions.)

    b) Use a suitable shared library mechanism for linking with the
    Library.  A suitable mechanism is one that (1) uses at run time a
    copy of the library already present on the user's computer system,
    rather than copying library functions into the executable, and (2)
    will operate properly with a modified version of the library, if
    the user installs one, as long as the modified version is
    interface-compatible with the version that the work was made with.

    c) Accompany the work with a written offer, valid for at
    least three years, to give the same user the materials
    specified in Subsection 6a, above, for a charge no more
    than the cost of performing this distribution.

    d) If distribution of the work is made by offering access to copy
    from a designated place, offer equivalent access to copy the above
    specified materials from the same place.

    e) Verify that the user has already received a copy of these
    materials or that you have already sent this user a copy.

  For an executable, the required form of the "work that uses the
Library" must include any data and utility programs needed for
reproducing the executable from it.  However, as a special exception,
the materials to be distributed need not include anything that is
normally distributed (in either source or binary form) with the major
components (compiler, kernel, and so on) of the operating system on
which the executable runs, unless that component itself accompanies
the executable.

  It may happen that this requirement contradicts the license
restrictions of other proprietary libraries that do not normally
accompany the operating system.  Such a contradiction means you cannot
use both them and the Library together in an executable that you
distribute.
\f
  7. You may place library facilities that are a work based on the
Library side-by-side in a single library together with other library
facilities not covered by this License, and distribute such a combined
library, provided that the separate distribution of the work based on
the Library and of the other library facilities is otherwise
permitted, and provided that you do these two things:

    a) Accompany the combined library with a copy of the same work
    based on the Library, uncombined with any other library
    facilities.  This must be distributed under the terms of the
    Sections above.

    b) Give prominent notice with the combined library of the fact
    that part of it is a work based on the Library, and explaining
    where to find the accompanying uncombined form of the same work.

  8. You may not copy, modify, sublicense, link with, or distribute
the Library except as expressly provided under this License.  Any
attempt otherwise to copy, modify, sublicense, link with, or
distribute the Library is void, and will automatically terminate your
rights under this License.  However, parties who have received copies,
or rights, from you under this License will not have their licenses
terminated so long as such parties remain in full compliance.

  9. You are not required to accept this License, since you have not
signed it.  However, nothing else grants you permission to modify or
distribute the Library or its derivative works.  These actions are
prohibited by law if you do not accept this License.  Therefore, by
modifying or distributing the Library (or any work based on the
Library), you indicate your acceptance of this License to do so, and
all its terms and conditions for copying, distributing or modifying
the Library or works based on it.

  10. Each time you redistribute the Library (or any work based on the
Library), the recipient automatically receives a license from the
original licensor to copy, distribute, link with or modify the Library
subject to these terms and conditions.  You may not impose any further
restrictions on the recipients' exercise of the rights granted herein.
You are not responsible for enforcing compliance by third parties with
this License.
\f
  11. If, as a consequence of a court judgment or allegation of patent
infringement or for any other reason (not limited to patent issues),
conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot
distribute so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you
may not distribute the Library at all.  For example, if a patent
license would not permit royalty-free redistribution of the Library by
all those who receive copies directly or indirectly through you, then
the only way you could satisfy both it and this License would be to
refrain entirely from distribution of the Library.

If any portion of this section is held invalid or unenforceable under any
particular circumstance, the balance of the section is intended to apply,
and the section as a whole is intended to apply in other circumstances.

It is not the purpose of this section to induce you to infringe any
patents or other property right claims or to contest validity of any
such claims; this section has the sole purpose of protecting the
integrity of the free software distribution system which is
implemented by public license practices.  Many people have made
generous contributions to the wide range of software distributed
through that system in reliance on consistent application of that
system; it is up to the author/donor to decide if he or she is willing
to distribute software through any other system and a licensee cannot
impose that choice.

This section is intended to make thoroughly clear what is believed to
be a consequence of the rest of this License.

  12. If the distribution and/or use of the Library is restricted in
certain countries either by patents or by copyrighted interfaces, the
original copyright holder who places the Library under this License may add
an explicit geographical distribution limitation excluding those countries,
so that distribution is permitted only in or among countries not thus
excluded.  In such case, this License incorporates the limitation as if
written in the body of this License.

  13. The Free Software Foundation may publish revised and/or new
versions of the Lesser General Public License from time to time.
Such new versions will be similar in spirit to the present version,
but may differ in detail to address new problems or concerns.

Each version is given a distinguishing version number.  If the Library
specifies a version number of this License which applies to it and
"any later version", you have the option of following the terms and
conditions either of that version or of any later version published by
the Free Software Foundation.  If the Library does not specify a
license version number, you may choose any version ever published by
the Free Software Foundation.
\f
  14. If you wish to incorporate parts of the Library into other free
programs whose distribution conditions are incompatible with these,
write to the author to ask for permission.  For software which is
copyrighted by the Free Software Foundation, write to the Free
Software Foundation; we sometimes make exceptions for this.  Our
decision will be guided by the two goals of preserving the free status
of all derivatives of our free software and of promoting the sharing
and reuse of software generally.

                            NO WARRANTY

  15. BECAUSE THE LIBRARY IS LICENSED FREE OF CHARGE, THERE IS NO
WARRANTY FOR THE LIBRARY, TO THE EXTENT PERMITTED BY APPLICABLE LAW.
EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR
OTHER PARTIES PROVIDE THE LIBRARY "AS IS" WITHOUT WARRANTY OF ANY
KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE
LIBRARY IS WITH YOU.  SHOULD THE LIBRARY PROVE DEFECTIVE, YOU ASSUME
THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

  16. IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN
WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY MODIFY
AND/OR REDISTRIBUTE THE LIBRARY AS PERMITTED ABOVE, BE LIABLE TO YOU
FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR
CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE
LIBRARY (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING
RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD PARTIES OR A
FAILURE OF THE LIBRARY TO OPERATE WITH ANY OTHER SOFTWARE), EVEN IF
SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
DAMAGES.

                     END OF TERMS AND CONDITIONS
`},{path:`README.md`,content:`# WorldForge

An extensible world-engine framework for **Minecraft 1.21.1 / Forge 52.1.0**.

WorldForge is not a content mod. It is an integration and orchestration layer for large modpacks: it discovers what is actually installed, classifies how much of it can be inspected, and exposes a stable API for adapters that talk to other mods through **their official surfaces**.

If a mod provides an API, WorldForge uses the API.  
If it exposes registries, WorldForge counts them.  
If it provides nothing useful, WorldForge marks it **UNKNOWN**. It does not reverse-engineer.

## Status

**0.4.0 — player knowledge and loader honesty.** Vanilla combat is still bound through \`Registries.DAMAGE_TYPE\`. Player records persist in the world save (schema 3) and are dropped if the modpack fingerprint changes. Ars Nouveau and Iron's Spells stay unbound: their 1.21 APIs are published for NeoForge, and this project is Forge. \`src/optional-ars\` is in the tree and excluded from the jar.

| Phase | Scope | State |
| --- | --- | --- |
| 1 | Forge setup, config, logging, lifecycle | Done |
| 2 | Service architecture, events, data layer | Done |
| 3 | Mod discovery, registry census, knowledge | Done |
| 4 | Persistent world/modpack knowledge + versioning | Done |
| 5 | Generic adapters + integration manager | Done |
| 6 | World systems (regions, POIs, environment) | Done |
| 7–8 | Magic / combat integration | Done (vanilla combat bound; third-party magic detect-only) |
| 9 | Player knowledge, loader mismatch, disabled optional bridge | In progress (0.4.0) |
| 10 | Optimisation | Not started |

## Requirements

- JDK 21
- Minecraft 1.21.1
- Forge 52.1.0 (recommended)

## Build

\`\`\`bash
./gradlew genIntellijRuns
./gradlew build
./gradlew runClient
\`\`\`

The Gradle wrapper is included. First run downloads Minecraft mappings and Forge — expect several minutes.

\`./gradlew explainOptionalArs\` prints why the Ars bridge is not compiled.

## In-game

Operator command (permission 2):

\`\`\`
/worldforge status
/worldforge discover
/worldforge knowledge
/worldforge world
/worldforge region list
/worldforge region here
/worldforge poi list
/worldforge poi here
/worldforge event list
/worldforge event raid village_bell
/worldforge magic
/worldforge combat
/worldforge player
/worldforge compat
/worldforge bus
/worldforge descriptors
\`\`\`

Common config (\`worldforge-common.toml\`):

- \`debugMode\` — verbose category logs
- \`discoveryOnStartup\` — scan mods during common setup
- \`scanDatapackRegistries\` — census biomes/enchantments/structures on server start
- \`integrations.*\` — enable/disable adapter families
- \`experimentalFeatures\` — reserved for high-volume events (off)

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md), and [docs/ROADMAP.md](docs/ROADMAP.md).

Package layout:

\`\`\`
net.worldforge
  api/           Stable types other mods may compile against
  api/combat/    Damage types, attributes, combat snapshot
  api/magic/     Magic descriptors and live MagicSystem surface
  api/event/     EngineEvent + public WorldForgeEventBus
  api/world/     Snapshot, Region, POI, WorldEvent
  api/knowledge/ Status, ModKnowledge, PlayerRecord
  core/          Bootstrap, config, logging, services
  discovery/     Loader metadata + registry census
  knowledge/     KNOWN / PARTIALLY_KNOWN / UNKNOWN
  persistence/   SavedData schema 3, fingerprint
  integration/   Adapter manager, loader mismatch catalog
  combat/        Vanilla combat census
  magic/         Detected magic catalog
  event/         Narrow Forge event router
  world/         World-state façade, player registry
  command/       Diagnostics
\`\`\`

\`src/optional-ars\` is outside \`src/main\` and is not packaged.

## Compatibility

WorldForge has **no optional Maven dependencies**. Target mods are detected at runtime with \`ModList.isLoaded\`. A missing magic/tech/quest mod never crashes the loader. The combat adapter binds **vanilla only**. Ars Nouveau and Iron's Spells are recorded as NeoForge-published APIs and are not bound on Forge 1.21.1.

## License

MIT. Minecraft and Forge are property of their respective owners. Official mappings are used under Mojang's mapping license.
`},{path:`build.gradle`,content:`// WorldForge — Minecraft 1.21.1 / Forge 52.1.0
// MDK layout kept so \`./gradlew genIntellijRuns\` and \`./gradlew runClient\` work as-is.
plugins {
    id 'eclipse'
    id 'idea'
    id 'maven-publish'
    id 'net.minecraftforge.gradle' version '[6.0.24,6.2)'
}

version = mod_version
group = mod_group_id

base {
    archivesName = mod_id
}

// Mojang ships Java 21 to end users in 1.20.5+, so your mod should target Java 21.
java.toolchain.languageVersion = JavaLanguageVersion.of(21)

println "Java: \${System.getProperty 'java.version'}, JVM: \${System.getProperty 'java.vm.version'} (\${System.getProperty 'java.vendor'}), Arch: \${System.getProperty 'os.arch'}"
minecraft {
    // The mappings can be changed at any time and must be in the following format.
    // Channel:   Version:
    // official   MCVersion             Official field/method names from Mojang mapping files
    // parchment  YYYY.MM.DD-MCVersion  Open community-sourced parameter names and javadocs layered on top of official
    //
    // You must be aware of the Mojang license when using the 'official' or 'parchment' mappings.
    // See more information here: https://github.com/MinecraftForge/MCPConfig/blob/master/Mojang.md
    //
    // Parchment is an unofficial project maintained by ParchmentMC, separate from MinecraftForge
    // Additional setup is needed to use their mappings: https://parchmentmc.org/docs/getting-started
    //
    // Use non-default mappings at your own risk. They may not always work.
    // Simply re-run your setup task after changing the mappings to update your workspace.
    mappings channel: mapping_channel, version: mapping_version
    
    // Tell FG to not automtically create the reobf tasks, as we now use Official mappings at runtime, If you don't use them at dev time then you'll have to fix your reobf yourself.
    reobf = false

    // When true, this property will have all Eclipse/IntelliJ IDEA run configurations run the "prepareX" task for the given run configuration before launching the game.
    // In most cases, it is not necessary to enable.
    // enableEclipsePrepareRuns = true
    // enableIdeaPrepareRuns = true

    // This property allows configuring Gradle's ProcessResources task(s) to run on IDE output locations before launching the game.
    // It is REQUIRED to be set to true for this template to function.
    // See https://docs.gradle.org/current/dsl/org.gradle.language.jvm.tasks.ProcessResources.html
    copyIdeResources = true

    // When true, this property will add the folder name of all declared run configurations to generated IDE run configurations.
    // The folder name can be set on a run configuration using the "folderName" property.
    // By default, the folder name of a run configuration is the name of the Gradle project containing it.
    // generateRunFolders = true

    // This property enables access transformers for use in development.
    // They will be applied to the Minecraft artifact.
    // The access transformer file can be anywhere in the project.
    // However, it must be at "META-INF/accesstransformer.cfg" in the final mod jar to be loaded by Forge.
    // This default location is a best practice to automatically put the file in the right place in the final jar.
    // See https://docs.minecraftforge.net/en/latest/advanced/accesstransformers/ for more information.
    // accessTransformer = file('src/main/resources/META-INF/accesstransformer.cfg')

    // Default run configurations.
    // These can be tweaked, removed, or duplicated as needed.
    runs {
        // applies to all the run configs below
        configureEach {
            workingDirectory project.file('run')

            // Recommended logging data for a userdev environment
            // The markers can be added/remove as needed separated by commas.
            // "SCAN": For mods scan.
            // "REGISTRIES": For firing of registry events.
            // "REGISTRYDUMP": For getting the contents of all registries.
            property 'forge.logging.markers', 'REGISTRIES'

            // Recommended logging level for the console
            // You can set various levels here.
            // Please read: https://stackoverflow.com/questions/2031163/when-to-use-the-different-log-levels
            property 'forge.logging.console.level', 'debug'
        }

        client {
            // Comma-separated list of namespaces to load gametests from. Empty = all namespaces.
            property 'forge.enabledGameTestNamespaces', mod_id
        }

        server {
            property 'forge.enabledGameTestNamespaces', mod_id
            args '--nogui'
        }

        // This run config launches GameTestServer and runs all registered gametests, then exits.
        // By default, the server will crash when no gametests are provided.
        // The gametest system is also enabled by default for other run configs under the /test command.
        gameTestServer {
            property 'forge.enabledGameTestNamespaces', mod_id
        }

        data {
            // example of overriding the workingDirectory set in configureEach above
            workingDirectory project.file('run-data')

            // Specify the modid for data generation, where to output the resulting resource, and where to look for existing resources.
            args '--mod', mod_id, '--all', '--output', file('src/generated/resources/'), '--existing', file('src/main/resources/')
        }
    }
}

// Include resources generated by data generators.
sourceSets.main.resources { srcDir 'src/generated/resources' }

repositories {
    // Put repositories for dependencies here
    // ForgeGradle automatically adds the Forge maven and Maven Central for you

    // If you have mod jar dependencies in ./libs, you can declare them as a repository like so.
    // See https://docs.gradle.org/current/userguide/declaring_repositories.html#sub:flat_dir_resolver
    // flatDir {
    //     dir 'libs'
    // }
}

dependencies {
    // Specify the version of Minecraft to use.
    // Any artifact can be supplied so long as it has a "userdev" classifier artifact and is a compatible patcher artifact.
    // The "userdev" classifier will be requested and setup by ForgeGradle.
    // If the group id is "net.minecraft" and the artifact id is one of ["client", "server", "joined"],
    // then special handling is done to allow a setup of a vanilla dependency without the use of an external repository.
    minecraft "net.minecraftforge:forge:\${minecraft_version}-\${forge_version}"

    // Example mod dependency with JEI
    // The JEI API is declared for compile time use, while the full JEI artifact is used at runtime
    // compileOnly "mezz.jei:jei-\${mc_version}-common-api:\${jei_version}"
    // compileOnly "mezz.jei:jei-\${mc_version}-forge-api:\${jei_version}"
    // runtimeOnly "mezz.jei:jei-\${mc_version}-forge:\${jei_version}"

    // Example mod dependency using a mod jar from ./libs with a flat dir repository
    // This maps to ./libs/coolmod-\${mc_version}-\${coolmod_version}.jar
    // The group id is ignored when searching -- in this case, it is "blank"
    // implementation fg.deobf("blank:coolmod-\${mc_version}:\${coolmod_version}")

    // For more info:
    // http://www.gradle.org/docs/current/userguide/artifact_dependencies_tutorial.html
    // http://www.gradle.org/docs/current/userguide/dependency_management.html
}

// This block of code expands all declared replace properties in the specified resource targets.
// A missing property will result in an error. Properties are expanded using \${} Groovy notation.
// When "copyIdeResources" is enabled, this will also run before the game launches in IDE environments.
// See https://docs.gradle.org/current/dsl/org.gradle.language.jvm.tasks.ProcessResources.html
tasks.named('processResources', ProcessResources).configure {
    var replaceProperties = [
            minecraft_version: minecraft_version, minecraft_version_range: minecraft_version_range,
            forge_version: forge_version, forge_version_range: forge_version_range,
            loader_version_range: loader_version_range,
            mod_id: mod_id, mod_name: mod_name, mod_license: mod_license, mod_version: mod_version,
            mod_authors: mod_authors, mod_description: mod_description,
    ]
    inputs.properties replaceProperties

    filesMatching(['META-INF/mods.toml', 'pack.mcmeta']) {
        expand replaceProperties + [project: project]
    }
}

// Example for how to get properties into the manifest for reading at runtime.
tasks.named('jar', Jar).configure {
    manifest {
        attributes([
            'Specification-Title'     : mod_id,
            'Specification-Vendor'    : mod_authors,
            'Specification-Version'   : '1', // We are version 1 of ourselves
            'Implementation-Title'    : project.name,
            'Implementation-Version'  : project.jar.archiveVersion,
            'Implementation-Vendor'   : mod_authors
        ])
    }
}

// Example configuration to allow publishing using the maven-publish plugin
publishing {
    publications {
        register('mavenJava', MavenPublication) {
            artifact jar
        }
    }
    repositories {
        maven {
            url "file://\${project.projectDir}/mcmodsrepo"
        }
    }
}

tasks.withType(JavaCompile).configureEach {
    options.encoding = 'UTF-8' // Use the UTF-8 charset for Java compilation
}

// IntelliJ no longer downloads javadocs and sources by default.
// This tells Gradle to force IDEA to do it.
idea.module { downloadJavadoc = downloadSources = true }

eclipse {
    // Run everytime eclipse builds the code
    //autoBuildTasks genEclipseRuns
    // Run when importing the project
    synchronizationTasks 'genEclipseRuns'
}

// Merge the resources and classes into the same directory.
// This is done because java expects modules to be in a single directory.
// And if we have it in multiple we have to do performance intensive hacks like having the UnionFileSystem
// This will eventually be migrated to ForgeGradle so modders don't need to manually do it. But that is later.
sourceSets.each {
    def dir = layout.buildDirectory.dir("sourcesSets/$it.name")
    it.output.resourcesDir = dir
    it.java.destinationDirectory = dir
}

// src/optional-ars is deliberately NOT a source set.
// Ars Nouveau 1.21.x publishes a NeoForge API. Adding it here would make
// \`./gradlew build\` depend on the wrong loader. The directory stays in the
// tree as a documented refusal. See src/optional-ars/README.md.
tasks.register('explainOptionalArs') {
    group = 'worldforge'
    description = 'Why src/optional-ars is excluded from the Forge jar.'
    doLast {
        logger.lifecycle('src/optional-ars is not on the compile or jar graph.')
        logger.lifecycle('Ars Nouveau 1.21.1 publishes a NeoForge API (net.neoforged). WorldForge is Forge 52.1.0.')
        logger.lifecycle('Do not add a NeoForge Maven coordinate to this project.')
        logger.lifecycle('The bridge class documents the refusal and is not imported from src/main.')
    }
}
`},{path:`gradle.properties`,content:`# Sets default memory used for gradle commands. Can be overridden by user or command line properties.
# This is required to provide enough memory for the Minecraft decompilation process.
org.gradle.jvmargs=-Xmx3G
org.gradle.daemon=false


## Environment Properties

minecraft_version=1.21.1
minecraft_version_range=[1.21.1,1.22)
forge_version=52.1.0
forge_version_range=[52,)
loader_version_range=[52,)
mapping_channel=official
mapping_version=1.21.1


## Mod Properties

mod_id=worldforge
mod_name=WorldForge
mod_license=MIT
mod_version=0.4.0
mod_group_id=net.worldforge
mod_authors=SoloGam
mod_description=An extensible world-engine framework for Minecraft Forge modpacks. WorldForge discovers the surrounding mod environment, classifies what it can actually inspect, and exposes a stable integration API. It does not pretend to understand mods it cannot safely observe.
`},{path:`gradlew`,content:`#!/bin/sh

#
# Copyright © 2015-2021 the original authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

##############################################################################
#
#   Gradle start up script for POSIX generated by Gradle.
#
#   Important for running:
#
#   (1) You need a POSIX-compliant shell to run this script. If your /bin/sh is
#       noncompliant, but you have some other compliant shell such as ksh or
#       bash, then to run this script, type that shell name before the whole
#       command line, like:
#
#           ksh Gradle
#
#       Busybox and similar reduced shells will NOT work, because this script
#       requires all of these POSIX shell features:
#         * functions;
#         * expansions «$var», «\${var}», «\${var:-default}», «\${var+SET}»,
#           «\${var#prefix}», «\${var%suffix}», and «$( cmd )»;
#         * compound commands having a testable exit status, especially «case»;
#         * various built-in commands including «command», «set», and «ulimit».
#
#   Important for patching:
#
#   (2) This script targets any POSIX shell, so it avoids extensions provided
#       by Bash, Ksh, etc; in particular arrays are avoided.
#
#       The "traditional" practice of packing multiple parameters into a
#       space-separated string is a well documented source of bugs and security
#       problems, so this is (mostly) avoided, by progressively accumulating
#       options in "$@", and eventually passing that to Java.
#
#       Where the inherited environment variables (DEFAULT_JVM_OPTS, JAVA_OPTS,
#       and GRADLE_OPTS) rely on word-splitting, this is performed explicitly;
#       see the in-line comments for details.
#
#       There are tweaks for specific operating systems such as AIX, CygWin,
#       Darwin, MinGW, and NonStop.
#
#   (3) This script is generated from the Groovy template
#       https://github.com/gradle/gradle/blob/HEAD/subprojects/plugins/src/main/resources/org/gradle/api/internal/plugins/unixStartScript.txt
#       within the Gradle project.
#
#       You can find Gradle at https://github.com/gradle/gradle/.
#
##############################################################################

# Attempt to set APP_HOME

# Resolve links: $0 may be a link
app_path=$0

# Need this for daisy-chained symlinks.
while
    APP_HOME=\${app_path%"\${app_path##*/}"}  # leaves a trailing /; empty if no leading path
    [ -h "$app_path" ]
do
    ls=$( ls -ld "$app_path" )
    link=\${ls#*' -> '}
    case $link in             #(
      /*)   app_path=$link ;; #(
      *)    app_path=$APP_HOME$link ;;
    esac
done

# This is normally unused
# shellcheck disable=SC2034
APP_BASE_NAME=\${0##*/}
# Discard cd standard output in case $CDPATH is set (https://github.com/gradle/gradle/issues/25036)
APP_HOME=$( cd "\${APP_HOME:-./}" > /dev/null && pwd -P ) || exit

# Use the maximum available, or set MAX_FD != -1 to use that value.
MAX_FD=maximum

warn () {
    echo "$*"
} >&2

die () {
    echo
    echo "$*"
    echo
    exit 1
} >&2

# OS specific support (must be 'true' or 'false').
cygwin=false
msys=false
darwin=false
nonstop=false
case "$( uname )" in                #(
  CYGWIN* )         cygwin=true  ;; #(
  Darwin* )         darwin=true  ;; #(
  MSYS* | MINGW* )  msys=true    ;; #(
  NONSTOP* )        nonstop=true ;;
esac

CLASSPATH=$APP_HOME/gradle/wrapper/gradle-wrapper.jar


# Determine the Java command to use to start the JVM.
if [ -n "$JAVA_HOME" ] ; then
    if [ -x "$JAVA_HOME/jre/sh/java" ] ; then
        # IBM's JDK on AIX uses strange locations for the executables
        JAVACMD=$JAVA_HOME/jre/sh/java
    else
        JAVACMD=$JAVA_HOME/bin/java
    fi
    if [ ! -x "$JAVACMD" ] ; then
        die "ERROR: JAVA_HOME is set to an invalid directory: $JAVA_HOME

Please set the JAVA_HOME variable in your environment to match the
location of your Java installation."
    fi
else
    JAVACMD=java
    if ! command -v java >/dev/null 2>&1
    then
        die "ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.

Please set the JAVA_HOME variable in your environment to match the
location of your Java installation."
    fi
fi

# Increase the maximum file descriptors if we can.
if ! "$cygwin" && ! "$darwin" && ! "$nonstop" ; then
    case $MAX_FD in #(
      max*)
        # In POSIX sh, ulimit -H is undefined. That's why the result is checked to see if it worked.
        # shellcheck disable=SC2039,SC3045
        MAX_FD=$( ulimit -H -n ) ||
            warn "Could not query maximum file descriptor limit"
    esac
    case $MAX_FD in  #(
      '' | soft) :;; #(
      *)
        # In POSIX sh, ulimit -n is undefined. That's why the result is checked to see if it worked.
        # shellcheck disable=SC2039,SC3045
        ulimit -n "$MAX_FD" ||
            warn "Could not set maximum file descriptor limit to $MAX_FD"
    esac
fi

# Collect all arguments for the java command, stacking in reverse order:
#   * args from the command line
#   * the main class name
#   * -classpath
#   * -D...appname settings
#   * --module-path (only if needed)
#   * DEFAULT_JVM_OPTS, JAVA_OPTS, and GRADLE_OPTS environment variables.

# For Cygwin or MSYS, switch paths to Windows format before running java
if "$cygwin" || "$msys" ; then
    APP_HOME=$( cygpath --path --mixed "$APP_HOME" )
    CLASSPATH=$( cygpath --path --mixed "$CLASSPATH" )

    JAVACMD=$( cygpath --unix "$JAVACMD" )

    # Now convert the arguments - kludge to limit ourselves to /bin/sh
    for arg do
        if
            case $arg in                                #(
              -*)   false ;;                            # don't mess with options #(
              /?*)  t=\${arg#/} t=/\${t%%/*}              # looks like a POSIX filepath
                    [ -e "$t" ] ;;                      #(
              *)    false ;;
            esac
        then
            arg=$( cygpath --path --ignore --mixed "$arg" )
        fi
        # Roll the args list around exactly as many times as the number of
        # args, so each arg winds up back in the position where it started, but
        # possibly modified.
        #
        # NB: a \`for\` loop captures its iteration list before it begins, so
        # changing the positional parameters here affects neither the number of
        # iterations, nor the values presented in \`arg\`.
        shift                   # remove old arg
        set -- "$@" "$arg"      # push replacement arg
    done
fi


# Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script.
DEFAULT_JVM_OPTS='"-Xmx64m" "-Xms64m"'

# Collect all arguments for the java command:
#   * DEFAULT_JVM_OPTS, JAVA_OPTS, JAVA_OPTS, and optsEnvironmentVar are not allowed to contain shell fragments,
#     and any embedded shellness will be escaped.
#   * For example: A user cannot expect \${Hostname} to be expanded, as it is an environment variable and will be
#     treated as '\${Hostname}' itself on the command line.

set -- \\
        "-Dorg.gradle.appname=$APP_BASE_NAME" \\
        -classpath "$CLASSPATH" \\
        org.gradle.wrapper.GradleWrapperMain \\
        "$@"

# Stop when "xargs" is not available.
if ! command -v xargs >/dev/null 2>&1
then
    die "xargs is not available"
fi

# Use "xargs" to parse quoted args.
#
# With -n1 it outputs one arg per line, with the quotes and backslashes removed.
#
# In Bash we could simply go:
#
#   readarray ARGS < <( xargs -n1 <<<"$var" ) &&
#   set -- "\${ARGS[@]}" "$@"
#
# but POSIX shell has neither arrays nor command substitution, so instead we
# post-process each arg (as a line of input to sed) to backslash-escape any
# character that might be a shell metacharacter, then use eval to reverse
# that process (while maintaining the separation between arguments), and wrap
# the whole thing up as a single "set" statement.
#
# This will of course break if any of these variables contains a newline or
# an unmatched quote.
#

eval "set -- $(
        printf '%s\\n' "$DEFAULT_JVM_OPTS $JAVA_OPTS $GRADLE_OPTS" |
        xargs -n1 |
        sed ' s~[^-[:alnum:]+,./:=@_]~\\\\&~g; ' |
        tr '\\n' ' '
    )" '"$@"'

exec "$JAVACMD" "$@"
`},{path:`gradlew.bat`,content:`@rem
@rem Copyright 2015 the original author or authors.
@rem
@rem Licensed under the Apache License, Version 2.0 (the "License");
@rem you may not use this file except in compliance with the License.
@rem You may obtain a copy of the License at
@rem
@rem      https://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.
@rem

@if "%DEBUG%"=="" @echo off
@rem ##########################################################################
@rem
@rem  Gradle startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%"=="" set DIRNAME=.
@rem This is normally unused
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@rem Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS="-Xmx64m" "-Xms64m"

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if %ERRORLEVEL% equ 0 goto execute

echo. 1>&2
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH. 1>&2
echo. 1>&2
echo Please set the JAVA_HOME variable in your environment to match the 1>&2
echo location of your Java installation. 1>&2

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo. 1>&2
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME% 1>&2
echo. 1>&2
echo Please set the JAVA_HOME variable in your environment to match the 1>&2
echo location of your Java installation. 1>&2

goto fail

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\\gradle\\wrapper\\gradle-wrapper.jar


@rem Execute Gradle
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %GRADLE_OPTS% "-Dorg.gradle.appname=%APP_BASE_NAME%" -classpath "%CLASSPATH%" org.gradle.wrapper.GradleWrapperMain %*

:end
@rem End local scope for the variables with windows NT shell
if %ERRORLEVEL% equ 0 goto mainEnd

:fail
rem Set variable GRADLE_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
set EXIT_CODE=%ERRORLEVEL%
if %EXIT_CODE% equ 0 set EXIT_CODE=1
if not ""=="%GRADLE_EXIT_CONSOLE%" exit %EXIT_CODE%
exit /b %EXIT_CODE%

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
`},{path:`settings.gradle`,content:`pluginManagement {
    repositories {
        gradlePluginPortal()
        maven {
            name = 'MinecraftForge'
            url = 'https://maven.minecraftforge.net/'
        }
    }
}

plugins {
    id 'org.gradle.toolchains.foojay-resolver-convention' version '0.7.0'
}

rootProject.name = 'WorldForge'
`},{path:`docs/ARCHITECTURE.md`,content:`# WorldForge architecture

## Layering

\`\`\`
Minecraft
  → Forge
    → WorldForge Core
      → World / simulation systems
        → Compatibility & integration layer
          → Other mods (via adapters)
\`\`\`

Core never hard-codes support for a third-party mod. Adapters live beside the core and fail closed.

## Honesty contract

Every discovered mod is classified:

| Status | Meaning |
| --- | --- |
| \`KNOWN\` | Platform (minecraft/forge/worldforge) **or** a bound adapter whose \`boundTarget()\` is this mod |
| \`PARTIALLY_KNOWN\` | Registries or an integration point are visible; mechanics are not adapted |
| \`UNKNOWN\` | Loader metadata only |

WorldForge will not invent behaviour for UNKNOWN mods. An adapter that is BOUND to vanilla does **not** make every listed extra target KNOWN.

## Knowledge scopes

| Scope | Lives where | Travels with |
| --- | --- | --- |
| CORE | Code | The jar |
| MODPACK | Fingerprint of installed mod ids+versions | The pack |
| WORLD | \`SavedData\` (\`worldforge\`) | The save |
| PLAYER | \`SavedData\` player list (schema 3) | The save, cleared on pack change |

Opening a world under a different modpack fingerprint **clears** world integration state and player records. Authored regions stay.

## Discovery

Two cheap, one-shot passes:

1. **Common setup** — \`ModList\` metadata + Forge registries (blocks, items, entities, effects, recipe serializers).
2. **Server start** — datapack registries (biomes, enchantments, structures) via \`RegistryAccess\`, plus vanilla combat census.

No world scans. No per-tick reflection. Results are cached on \`ModDiscoveryService\`.

## Events

\`EventRouter\` subscribes only to lifecycle events (server start/stop, login/logout, dimension change). High-volume block/entity events are not registered. An \`experimentalFeatures\` flag is reserved for later.

\`WorldForgeEventBus\` is a separate, public bus other mods may subscribe to. It is not Forge's bus. A throwing subscriber is ignored.

## Adapters

\`IntegrationManager\` owns domain adapters (magic, combat, technology, quest, worldgen). Each adapter lists target mod ids but those ids are **not** Forge dependencies. \`tryBind()\` must catch its own failures.

- **Combat** binds vanilla (\`minecraft\`) through \`Registries.DAMAGE_TYPE\`. Extra combat mods are recorded as detected extras.
- **Magic** records a loader mismatch and returns \`SKIPPED_NO_API\`. It does not import NeoForge.
- Descriptors load from \`data/worldforge/adapters/*.json\`.

## Persistence

\`WorldForgeSavedData\` stores schema version (currently 3), modpack fingerprint, a compound world-knowledge tag, authored regions, points of interest, and player records. Schema mismatches rewrite forward. Fingerprint mismatches discard integration state and player knowledge, not geography.

## World systems (Phase 6)

- **Dimension snapshot** — time, weather, difficulty, captured on demand (server start, login, \`/worldforge world\`). No ticker.
- **Regions** — operator- or API-authored circles. Never produced by a chunk scan.
- **POIs** — named points, optionally parented to a region.
- **World event bus** — pack-authored signals (\`raid\`, \`season\`, …). Ephemeral, capacity 64, not Forge's event bus.

## Combat (Phase 8)

Vanilla-only census on server start:

- Damage types (\`exhaustion\`, \`scaling\`, \`effects\`)
- Attributes
- Entity types grouped by \`MobCategory\`

## Magic (Phase 7, honesty pass in 0.4.0)

Informational descriptors only. The 1.21.1 public APIs for Ars Nouveau and Iron's Spells are NeoForge. \`src/optional-ars\` is excluded from compilation so the Forge jar never depends on \`net.neoforged\`. \`MagicSystem\` still exists so a later Forge-published API can bind without changing callers. Default methods return empty.

## Performance rules

- Event-driven, not ticker-driven
- Cache discovery
- Debug logging only when \`debugMode\` is true
- Never block the main thread on I/O beyond a single SavedData read/write
`},{path:`docs/COMPATIBILITY.md`,content:`# Compatibility

WorldForge must keep running when other mods are missing, added, removed, updated, or only partially inspectable.

## Rules

1. **No hard optional dependencies.** Target mods are detected with \`ModList.isLoaded\`. They are never Maven \`implementation\` lines in 0.x.
2. **Adapters fail closed.** \`tryBind()\` is wrapped by \`IntegrationManager\`. A thrown exception unbinds that adapter and is logged under \`[WorldForge:Integration]\`.
3. **Fingerprint isolation.** World saved data stores the pack fingerprint. A mismatch clears world integration state and player records. Authored regions stay.
4. **Honest status.** UNKNOWN is a valid, stable result. It is not a bug and not a prompt to scrape private classes.
5. **Config kill-switches.** Each adapter family can be disabled by operators without removing the jar.
6. **Bound target is specific.** \`isIntegrationBound(modId)\` is true only when that mod id is the adapter's \`boundTarget()\`. Combat bound to vanilla does not claim Apotheosis.

## 0.4.0 loader notes

| Mod | Published loader for 1.21 | WorldForge state |
| --- | --- | --- |
| ars_nouveau | NeoForge (\`ArsNouveauAPI\`) | \`PARTIALLY_KNOWN\`, not compiled |
| irons_spellbooks | NeoForge (Forge API documented only through 1.20.1) | \`PARTIALLY_KNOWN\`, not compiled |

\`src/optional-ars\` is not a source set. \`./gradlew explainOptionalArs\` prints why.

## 0.3.0 adapter policy

| Adapter | When loaded | State |
| --- | --- | --- |
| Combat | always (vanilla) | \`BOUND\` → \`minecraft\` |
| Combat extras | apotheosis / bettercombat | detected, not bound |
| Magic | ars_nouveau / irons_spellbooks | \`SKIPPED_NO_API\` |
| Technology / quest / worldgen | listed targets | \`SKIPPED_NO_API\` if present |

Until a documented third-party API is compiled as an isolated optional module, WorldForge will not call into those mods.
`},{path:`docs/ROADMAP.md`,content:`# Roadmap

## Done — 0.1.0 (Phases 1–5)

- Forge 1.21.1 / 52.1.0 workspace
- Config, structured logging, lifecycle
- Service registry
- Mod discovery + registry census
- Knowledge layer with honest status
- Persistent SavedData + schema + fingerprint
- Integration manager and domain adapter stubs
- \`/worldforge\` diagnostics

## Done — 0.2.0 (Phase 6)

- Dimension snapshot (time, weather, difficulty)
- Region registry (authored, not a world scan)
- Point-of-interest API
- Pack-authored world event bus
- SavedData schema 2

## Done — 0.3.0 (Phases 7–8, start of 9)

- Magic descriptor catalog; detect-only for Ars Nouveau / Iron's Spells
- Vanilla combat adapter bound through official damage-type / attribute / entity-category registries
- Public \`WorldForgeEventBus\`
- JSON adapter descriptors

## Done — 0.4.0 (Phase 9, partial)

- Player knowledge persisted in SavedData schema 3
- Cleared on modpack fingerprint change; regions kept
- Loader mismatch catalog: Ars Nouveau and Iron's Spells 1.21 APIs are NeoForge
- \`src/optional-ars\` present and excluded from \`./gradlew build\`

## Next — Phase 9 remainder

- A real magic bind only if a Forge-published API exists. Do not add NeoForge to this jar
- Compatibility test pack

## Later — Phase 10

- Profiling pass (allocation, registry census cost on 200-mod packs)
- High-volume combat events behind \`experimentalFeatures\`

## Non-goals for 0.x

- Shipping gameplay content
- Mixins against other mods
- Downloading code at runtime
- Pretending to understand closed systems
`},{path:`gradle/wrapper/gradle-wrapper.properties`,content:`distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.12.1-bin.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`},{path:`src/main/java/net/worldforge/WorldForge.java`,content:`package net.worldforge;

import net.worldforge.api.WorldForgeAPI;
import net.worldforge.core.WorldForgeCore;

/**
 * Public static facade. Other mods should prefer {@link WorldForgeAPI}
 * obtained from {@link #api()} rather than reaching into core packages.
 */
public final class WorldForge {
    private static final WorldForgeCore CORE = new WorldForgeCore();

    private WorldForge() {}

    public static WorldForgeCore core() {
        return CORE;
    }

    public static WorldForgeAPI api() {
        return CORE;
    }
}
`},{path:`src/main/java/net/worldforge/WorldForgeMod.java`,content:`package net.worldforge;

import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.config.ModConfig;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.worldforge.command.WorldForgeCommands;
import net.worldforge.core.WorldForgeCore;
import net.worldforge.core.config.WorldForgeConfig;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.event.EventRouter;

/**
 * Forge entry point. Keep this class thin: lifecycle wiring only.
 * Runtime behaviour lives in {@link WorldForgeCore}.
 */
@Mod(WorldForgeMod.MOD_ID)
public final class WorldForgeMod {
    public static final String MOD_ID = "worldforge";

    public WorldForgeMod(FMLJavaModLoadingContext context) {
        IEventBus modBus = context.getModEventBus();
        context.registerConfig(ModConfig.Type.COMMON, WorldForgeConfig.SPEC);
        modBus.addListener(this::onCommonSetup);

        EventRouter router = new EventRouter(WorldForge.core());
        MinecraftForge.EVENT_BUS.register(router);
        MinecraftForge.EVENT_BUS.register(new WorldForgeCommands());
    }

    private void onCommonSetup(final FMLCommonSetupEvent event) {
        event.enqueueWork(() -> {
            WorldForgeLog.info(LogCategory.CORE, "Common setup — building environment knowledge");
            WorldForge.core().bootstrap();
        });
    }
}
`},{path:`src/main/java/net/worldforge/api/WorldForgeAPI.java`,content:`package net.worldforge.api;

import net.worldforge.api.combat.CombatSnapshot;
import net.worldforge.api.combat.DamageTypeInfo;
import net.worldforge.api.discovery.DiscoveredMod;
import net.worldforge.api.event.WorldForgeEventBus;
import net.worldforge.api.integration.Adapter;
import net.worldforge.api.integration.AdapterDescriptor;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.api.integration.LoaderNote;
import net.worldforge.api.knowledge.ModKnowledge;
import net.worldforge.api.knowledge.PlayerRecord;
import net.worldforge.api.magic.MagicSystemDescriptor;
import net.worldforge.api.world.DimensionSnapshot;
import net.worldforge.api.world.PointOfInterest;
import net.worldforge.api.world.Region;
import net.worldforge.api.world.WorldEvent;
import net.worldforge.knowledge.KnowledgeLayer;

import java.util.Collection;
import java.util.Optional;

/**
 * Stable surface for other mods. Implementation details stay in core packages.
 */
public interface WorldForgeAPI {
    Collection<DiscoveredMod> discoveredMods();

    Optional<DiscoveredMod> mod(String modId);

    Optional<ModKnowledge> knowledge(String modId);

    KnowledgeLayer knowledgeLayer();

    Optional<Adapter> adapter(IntegrationDomain domain);

    boolean isIntegrationBound(String modId);

    Optional<DimensionSnapshot> dimensionSnapshot();

    Collection<Region> regions();

    Optional<Region> region(String id);

    Collection<PointOfInterest> pointsOfInterest();

    Collection<WorldEvent> recentWorldEvents();

    Collection<PlayerRecord> players();

    Optional<PlayerRecord> player(String uuid);

    boolean registerRegion(Region region);

    boolean registerPointOfInterest(PointOfInterest poi);

    WorldEvent postWorldEvent(String type, String payload);

    Collection<MagicSystemDescriptor> magicSystems();

    Collection<DamageTypeInfo> damageTypes();

    CombatSnapshot combatSnapshot();

    WorldForgeEventBus eventBus();

    Collection<AdapterDescriptor> adapterDescriptors();

    Collection<LoaderNote> loaderNotes();
}
`},{path:`src/main/java/net/worldforge/api/combat/AttributeInfo.java`,content:`package net.worldforge.api.combat;

import java.util.Objects;

/**
 * Vanilla (or datapack) attribute id from the official attribute registry.
 */
public final class AttributeInfo {
    private final String id;

    public AttributeInfo(String id) {
        this.id = Objects.requireNonNull(id);
    }

    public String id() {
        return id;
    }
}
`},{path:`src/main/java/net/worldforge/api/combat/CombatSnapshot.java`,content:`package net.worldforge.api.combat;

import java.util.Collection;
import java.util.List;

/**
 * One-shot vanilla combat census. Third-party combat mods are never inferred here.
 */
public final class CombatSnapshot {
    private final boolean vanillaBound;
    private final int damageTypeCount;
    private final int attributeCount;
    private final List<EntityCategoryCount> entityCategories;
    private final List<String> extraDetectedMods;

    public CombatSnapshot(
            boolean vanillaBound,
            int damageTypeCount,
            int attributeCount,
            Collection<EntityCategoryCount> entityCategories,
            Collection<String> extraDetectedMods
    ) {
        this.vanillaBound = vanillaBound;
        this.damageTypeCount = damageTypeCount;
        this.attributeCount = attributeCount;
        this.entityCategories = List.copyOf(entityCategories);
        this.extraDetectedMods = List.copyOf(extraDetectedMods);
    }

    public static CombatSnapshot empty() {
        return new CombatSnapshot(false, 0, 0, List.of(), List.of());
    }

    public boolean vanillaBound() {
        return vanillaBound;
    }

    public int damageTypeCount() {
        return damageTypeCount;
    }

    public int attributeCount() {
        return attributeCount;
    }

    public List<EntityCategoryCount> entityCategories() {
        return entityCategories;
    }

    public List<String> extraDetectedMods() {
        return extraDetectedMods;
    }
}
`},{path:`src/main/java/net/worldforge/api/combat/DamageTypeInfo.java`,content:`package net.worldforge.api.combat;

import java.util.Objects;

/**
 * Inspectable vanilla (or datapack) damage type. Built from the official
 * {@code Registries.DAMAGE_TYPE} registry — never from other mods' internals.
 */
public final class DamageTypeInfo {
    private final String id;
    private final float exhaustion;
    private final String scaling;
    private final String effects;

    public DamageTypeInfo(String id, float exhaustion, String scaling, String effects) {
        this.id = Objects.requireNonNull(id);
        this.exhaustion = exhaustion;
        this.scaling = scaling == null ? "" : scaling;
        this.effects = effects == null ? "" : effects;
    }

    public String id() {
        return id;
    }

    public float exhaustion() {
        return exhaustion;
    }

    public String scaling() {
        return scaling;
    }

    public String effects() {
        return effects;
    }
}
`},{path:`src/main/java/net/worldforge/api/combat/EntityCategoryCount.java`,content:`package net.worldforge.api.combat;

import java.util.Objects;

/**
 * Count of entity types in one vanilla {@code MobCategory}.
 */
public final class EntityCategoryCount {
    private final String category;
    private final int count;

    public EntityCategoryCount(String category, int count) {
        this.category = Objects.requireNonNull(category);
        this.count = Math.max(0, count);
    }

    public String category() {
        return category;
    }

    public int count() {
        return count;
    }
}
`},{path:`src/main/java/net/worldforge/api/discovery/DiscoveredMod.java`,content:`package net.worldforge.api.discovery;

import java.util.List;
import java.util.Objects;

public final class DiscoveredMod {
    public record Dependency(String modId, String versionRange, boolean mandatory) {}

    private final String modId;
    private final String displayName;
    private final String version;
    private final String description;
    private final List<Dependency> dependencies;

    public DiscoveredMod(
            String modId,
            String displayName,
            String version,
            String description,
            List<Dependency> dependencies
    ) {
        this.modId = Objects.requireNonNull(modId);
        this.displayName = displayName == null ? modId : displayName;
        this.version = version == null ? "unknown" : version;
        this.description = description == null ? "" : description;
        this.dependencies = List.copyOf(dependencies);
    }

    public String modId() {
        return modId;
    }

    public String displayName() {
        return displayName;
    }

    public String version() {
        return version;
    }

    public String description() {
        return description;
    }

    public List<Dependency> dependencies() {
        return dependencies;
    }
}
`},{path:`src/main/java/net/worldforge/api/discovery/RegistryCensus.java`,content:`package net.worldforge.api.discovery;

/**
 * Counts of registry entries namespaced to a single mod.
 * Datapack registries are filled later, when a server is available.
 */
public final class RegistryCensus {
    private final int blocks;
    private final int items;
    private final int entities;
    private final int effects;
    private final int recipeSerializers;
    private final int biomes;
    private final int enchantments;
    private final int structures;

    public RegistryCensus(
            int blocks,
            int items,
            int entities,
            int effects,
            int recipeSerializers,
            int biomes,
            int enchantments,
            int structures
    ) {
        this.blocks = blocks;
        this.items = items;
        this.entities = entities;
        this.effects = effects;
        this.recipeSerializers = recipeSerializers;
        this.biomes = biomes;
        this.enchantments = enchantments;
        this.structures = structures;
    }

    public static RegistryCensus empty() {
        return new RegistryCensus(0, 0, 0, 0, 0, 0, 0, 0);
    }

    public RegistryCensus withDatapack(int biomes, int enchantments, int structures) {
        return new RegistryCensus(blocks, items, entities, effects, recipeSerializers, biomes, enchantments, structures);
    }

    public int blocks() { return blocks; }
    public int items() { return items; }
    public int entities() { return entities; }
    public int effects() { return effects; }
    public int recipeSerializers() { return recipeSerializers; }
    public int biomes() { return biomes; }
    public int enchantments() { return enchantments; }
    public int structures() { return structures; }

    public int totalKnown() {
        return blocks + items + entities + effects + recipeSerializers + biomes + enchantments + structures;
    }
}
`},{path:`src/main/java/net/worldforge/api/event/EngineEvent.java`,content:`package net.worldforge.api.event;

/**
 * Internal WorldForge event names. These are not Forge events;
 * the router translates selected Forge events into this vocabulary.
 */
public enum EngineEvent {
    WORLD_LOAD,
    WORLD_SAVE,
    SERVER_START,
    SERVER_STOP,
    PLAYER_LOGIN,
    PLAYER_LOGOUT,
    DIMENSION_CHANGE,
    DISCOVERY_COMPLETE,
    ADAPTER_BOUND,
    ADAPTER_SKIPPED,
    KNOWLEDGE_RECONCILED,
    REGION_REGISTERED,
    POI_REGISTERED,
    WORLD_EVENT
}
`},{path:`src/main/java/net/worldforge/api/event/EngineEventListener.java`,content:`package net.worldforge.api.event;

/**
 * Subscriber for WorldForge's own event vocabulary.
 * This is not a Forge event listener — other mods register here through
 * {@link WorldForgeEventBus} without touching MinecraftForge.EVENT_BUS.
 */
@FunctionalInterface
public interface EngineEventListener {
    void onEngineEvent(EngineEvent event, String detail);
}
`},{path:`src/main/java/net/worldforge/api/event/WorldForgeEventBus.java`,content:`package net.worldforge.api.event;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Public, fail-closed bus for other mods.
 * A throwing subscriber is dropped from the current publish and never
 * aborts WorldForge or other listeners.
 */
public final class WorldForgeEventBus {
    private static final int RECENT_CAP = 32;

    private final CopyOnWriteArrayList<EngineEventListener> listeners = new CopyOnWriteArrayList<>();
    private final ArrayDeque<String> recent = new ArrayDeque<>();

    public void subscribe(EngineEventListener listener) {
        if (listener != null) {
            listeners.addIfAbsent(listener);
        }
    }

    public void unsubscribe(EngineEventListener listener) {
        listeners.remove(listener);
    }

    public void publish(EngineEvent event, String detail) {
        Objects.requireNonNull(event);
        String line = event.name() + " " + (detail == null ? "" : detail);
        synchronized (recent) {
            recent.addLast(line.trim());
            while (recent.size() > RECENT_CAP) {
                recent.removeFirst();
            }
        }
        for (EngineEventListener listener : listeners) {
            try {
                listener.onEngineEvent(event, detail == null ? "" : detail);
            } catch (RuntimeException ignored) {
                // fail closed
            }
        }
    }

    public int subscriberCount() {
        return listeners.size();
    }

    public Collection<String> recent() {
        synchronized (recent) {
            return List.copyOf(recent);
        }
    }

    public List<EngineEventListener> snapshot() {
        return new ArrayList<>(listeners);
    }
}
`},{path:`src/main/java/net/worldforge/api/integration/Adapter.java`,content:`package net.worldforge.api.integration;

import java.util.Set;

/**
 * Optional integration with a third-party mod.
 * Adapters must fail closed: if the target is absent or unsafe, they stay unbound.
 */
public interface Adapter {
    String id();

    IntegrationDomain domain();

    /**
     * Mod IDs this adapter knows how to talk to through a public API.
     * Never use this as a hard Forge dependency.
     */
    Set<String> targetModIds();

    boolean isBound();

    /**
     * The mod id actually bound, if any. Presence of a listed target is not a binding.
     */
    default String boundTarget() {
        return null;
    }

    /**
     * Attempt to bind. Must not throw out of WorldForge.
     * @return true if an official, supported surface was bound
     */
    boolean tryBind();

    void unbind();
}
`},{path:`src/main/java/net/worldforge/api/integration/AdapterDescriptor.java`,content:`package net.worldforge.api.integration;

import java.util.List;
import java.util.Objects;

/**
 * Data-driven adapter descriptor. Loaded from
 * {@code data/worldforge/adapters/*.json}. Presence of a target id is not a binding.
 */
public final class AdapterDescriptor {
    private final String id;
    private final IntegrationDomain domain;
    private final List<String> targets;
    private final String bindPolicy;
    private final String notes;

    public AdapterDescriptor(
            String id,
            IntegrationDomain domain,
            List<String> targets,
            String bindPolicy,
            String notes
    ) {
        this.id = Objects.requireNonNull(id);
        this.domain = Objects.requireNonNull(domain);
        this.targets = List.copyOf(targets);
        this.bindPolicy = bindPolicy == null ? "documented-api-only" : bindPolicy;
        this.notes = notes == null ? "" : notes;
    }

    public String id() {
        return id;
    }

    public IntegrationDomain domain() {
        return domain;
    }

    public List<String> targets() {
        return targets;
    }

    public String bindPolicy() {
        return bindPolicy;
    }

    public String notes() {
        return notes;
    }
}
`},{path:`src/main/java/net/worldforge/api/integration/AdapterState.java`,content:`package net.worldforge.api.integration;

public enum AdapterState {
    UNBOUND,
    BOUND,
    SKIPPED_MISSING_TARGET,
    SKIPPED_DISABLED,
    SKIPPED_NO_API
}
`},{path:`src/main/java/net/worldforge/api/integration/IntegrationDomain.java`,content:`package net.worldforge.api.integration;

public enum IntegrationDomain {
    MAGIC,
    COMBAT,
    TECHNOLOGY,
    QUEST,
    WORLDGEN,
    GENERIC
}
`},{path:`src/main/java/net/worldforge/api/integration/LoaderNote.java`,content:`package net.worldforge.api.integration;

import net.worldforge.api.knowledge.KnowledgeStatus;

import java.util.Objects;

/**
 * Why a detected mod stays unbound. Popularity never upgrades this to KNOWN.
 */
public final class LoaderNote {
    private final String modId;
    private final PublishedLoader publishedLoader;
    private final KnowledgeStatus status;
    private final String reason;

    public LoaderNote(String modId, PublishedLoader publishedLoader, KnowledgeStatus status, String reason) {
        this.modId = Objects.requireNonNull(modId);
        this.publishedLoader = publishedLoader == null ? PublishedLoader.UNKNOWN : publishedLoader;
        this.status = status == null ? KnowledgeStatus.UNKNOWN : status;
        this.reason = reason == null ? "" : reason;
    }

    public String modId() { return modId; }
    public PublishedLoader publishedLoader() { return publishedLoader; }
    public KnowledgeStatus status() { return status; }
    public String reason() { return reason; }
}
`},{path:`src/main/java/net/worldforge/api/integration/PublishedLoader.java`,content:`package net.worldforge.api.integration;

/**
 * Loader a third-party mod actually publishes its API for.
 * This is documentary knowledge maintained by WorldForge, not a runtime scrape.
 */
public enum PublishedLoader {
    FORGE,
    NEOFORGE,
    UNKNOWN
}
`},{path:`src/main/java/net/worldforge/api/knowledge/KnowledgeStatus.java`,content:`package net.worldforge.api.knowledge;

/**
 * Honesty contract: WorldForge never upgrades a mod to KNOWN unless it can
 * actually inspect or adapt it through a supported surface.
 */
public enum KnowledgeStatus {
    KNOWN,
    PARTIALLY_KNOWN,
    UNKNOWN;

    public boolean isKnown() {
        return this == KNOWN;
    }
}
`},{path:`src/main/java/net/worldforge/api/knowledge/ModKnowledge.java`,content:`package net.worldforge.api.knowledge;

import net.worldforge.api.discovery.DiscoveredMod;
import net.worldforge.api.discovery.RegistryCensus;
import net.worldforge.api.integration.IntegrationDomain;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Structured, versioned knowledge about one installed mod.
 * This is informational unless a bound adapter exists.
 */
public final class ModKnowledge {
    private final DiscoveredMod mod;
    private final KnowledgeStatus status;
    private final RegistryCensus census;
    private final List<String> detectedApis;
    private final List<IntegrationDomain> domains;
    private final String adapterId;
    private final String reason;

    public ModKnowledge(
            DiscoveredMod mod,
            KnowledgeStatus status,
            RegistryCensus census,
            List<String> detectedApis,
            List<IntegrationDomain> domains,
            String adapterId,
            String reason
    ) {
        this.mod = Objects.requireNonNull(mod);
        this.status = Objects.requireNonNull(status);
        this.census = census == null ? RegistryCensus.empty() : census;
        this.detectedApis = List.copyOf(detectedApis);
        this.domains = List.copyOf(domains);
        this.adapterId = adapterId;
        this.reason = reason == null ? "" : reason;
    }

    public DiscoveredMod mod() {
        return mod;
    }

    public KnowledgeStatus status() {
        return status;
    }

    public RegistryCensus census() {
        return census;
    }

    public List<String> detectedApis() {
        return detectedApis;
    }

    public List<IntegrationDomain> domains() {
        return domains;
    }

    public Optional<String> adapterId() {
        return Optional.ofNullable(adapterId);
    }

    public String reason() {
        return reason;
    }
}
`},{path:`src/main/java/net/worldforge/api/knowledge/PlayerRecord.java`,content:`package net.worldforge.api.knowledge;

import java.util.Objects;

/**
 * Player-scoped knowledge. Identity and last-seen location only —
 * not inventory, spells, or anything WorldForge cannot honestly inspect.
 */
public final class PlayerRecord {
    private final String uuid;
    private final String name;
    private final int logins;
    private final String lastDimension;
    private final long lastSeenDayTime;
    private final boolean online;

    public PlayerRecord(String uuid, String name, int logins, String lastDimension, long lastSeenDayTime, boolean online) {
        this.uuid = Objects.requireNonNull(uuid);
        this.name = name == null || name.isBlank() ? uuid : name;
        this.logins = Math.max(0, logins);
        this.lastDimension = lastDimension == null || lastDimension.isBlank() ? "minecraft:overworld" : lastDimension;
        this.lastSeenDayTime = Math.max(0L, lastSeenDayTime);
        this.online = online;
    }

    public String uuid() { return uuid; }
    public String name() { return name; }
    public int logins() { return logins; }
    public String lastDimension() { return lastDimension; }
    public long lastSeenDayTime() { return lastSeenDayTime; }
    public boolean online() { return online; }
}
`},{path:`src/main/java/net/worldforge/api/magic/MagicCapability.java`,content:`package net.worldforge.api.magic;

/**
 * Capabilities a magic system may expose. Empty means we have not inspected
 * a public API — not that the mod has none.
 */
public enum MagicCapability {
    MANA,
    SPELLS,
    ABILITIES,
    RITUALS,
    SCHOOLS,
    EFFECTS,
    RESOURCES
}
`},{path:`src/main/java/net/worldforge/api/magic/MagicSystem.java`,content:`package net.worldforge.api.magic;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * Live magic surface. Only implemented when an official mod API is compiled in.
 * Default methods return empty so callers never have to special-case UNKNOWN.
 */
public interface MagicSystem {
    String modId();

    MagicSystemDescriptor descriptor();

    default Set<MagicCapability> capabilities() {
        return descriptor().capabilities();
    }

    default Optional<Integer> mana(UUID playerId) {
        return Optional.empty();
    }

    default List<String> spellIds() {
        return List.of();
    }

    default List<String> schoolIds() {
        return List.of();
    }
}
`},{path:`src/main/java/net/worldforge/api/magic/MagicSystemDescriptor.java`,content:`package net.worldforge.api.magic;

import net.worldforge.api.knowledge.KnowledgeStatus;

import java.util.Objects;
import java.util.Set;

/**
 * Informational record of a detected magic system.
 * Binding a live API is a separate step; this never invents mana or spells.
 */
public final class MagicSystemDescriptor {
    private final String modId;
    private final KnowledgeStatus status;
    private final Set<MagicCapability> capabilities;
    private final String note;

    public MagicSystemDescriptor(String modId, KnowledgeStatus status, Set<MagicCapability> capabilities, String note) {
        this.modId = Objects.requireNonNull(modId);
        this.status = Objects.requireNonNull(status);
        this.capabilities = Set.copyOf(capabilities);
        this.note = note == null ? "" : note;
    }

    public String modId() {
        return modId;
    }

    public KnowledgeStatus status() {
        return status;
    }

    public Set<MagicCapability> capabilities() {
        return capabilities;
    }

    public String note() {
        return note;
    }
}
`},{path:`src/main/java/net/worldforge/api/world/DimensionSnapshot.java`,content:`package net.worldforge.api.world;

import java.util.Objects;

/**
 * Cheap, point-in-time view of one dimension. Captured on demand — never by ticking the world.
 */
public final class DimensionSnapshot {
    private final String dimension;
    private final long dayTime;
    private final int day;
    private final long timeOfDay;
    private final String weather;
    private final String difficulty;

    public DimensionSnapshot(String dimension, long dayTime, String weather, String difficulty) {
        this.dimension = Objects.requireNonNull(dimension);
        this.dayTime = dayTime;
        this.day = (int) (dayTime / 24000L);
        this.timeOfDay = Math.floorMod(dayTime, 24000L);
        this.weather = weather == null ? "clear" : weather;
        this.difficulty = difficulty == null ? "normal" : difficulty;
    }

    public String dimension() { return dimension; }
    public long dayTime() { return dayTime; }
    public int day() { return day; }
    public long timeOfDay() { return timeOfDay; }
    public String weather() { return weather; }
    public String difficulty() { return difficulty; }
}
`},{path:`src/main/java/net/worldforge/api/world/PointOfInterest.java`,content:`package net.worldforge.api.world;

import java.util.Objects;

public final class PointOfInterest {
    private final String id;
    private final String regionId;
    private final String kind;
    private final String label;
    private final String dimension;
    private final int x;
    private final int y;
    private final int z;

    public PointOfInterest(
            String id,
            String regionId,
            String kind,
            String label,
            String dimension,
            int x,
            int y,
            int z
    ) {
        this.id = Objects.requireNonNull(id);
        this.regionId = regionId == null ? "" : regionId;
        this.kind = kind == null || kind.isBlank() ? "marker" : kind;
        this.label = label == null || label.isBlank() ? id : label;
        this.dimension = dimension == null || dimension.isBlank() ? "minecraft:overworld" : dimension;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public String id() { return id; }
    public String regionId() { return regionId; }
    public String kind() { return kind; }
    public String label() { return label; }
    public String dimension() { return dimension; }
    public int x() { return x; }
    public int y() { return y; }
    public int z() { return z; }
}
`},{path:`src/main/java/net/worldforge/api/world/Region.java`,content:`package net.worldforge.api.world;

import java.util.Objects;

/**
 * Authored area. WorldForge never invents regions by scanning chunks.
 */
public final class Region {
    private final String id;
    private final String name;
    private final String dimension;
    private final int x;
    private final int z;
    private final int radius;
    private final String biomeHint;

    public Region(String id, String name, String dimension, int x, int z, int radius, String biomeHint) {
        this.id = Objects.requireNonNull(id);
        this.name = name == null || name.isBlank() ? id : name;
        this.dimension = dimension == null || dimension.isBlank() ? "minecraft:overworld" : dimension;
        this.x = x;
        this.z = z;
        this.radius = Math.max(1, radius);
        this.biomeHint = biomeHint == null ? "" : biomeHint;
    }

    public String id() { return id; }
    public String name() { return name; }
    public String dimension() { return dimension; }
    public int x() { return x; }
    public int z() { return z; }
    public int radius() { return radius; }
    public String biomeHint() { return biomeHint; }

    public boolean contains(String dim, int px, int pz) {
        if (!this.dimension.equals(dim)) {
            return false;
        }
        long dx = (long) px - x;
        long dz = (long) pz - z;
        return dx * dx + dz * dz <= (long) radius * radius;
    }
}
`},{path:`src/main/java/net/worldforge/api/world/WorldEvent.java`,content:`package net.worldforge.api.world;

import java.util.Objects;

/**
 * Pack-authored world event. Not a Forge bus event and not fired per tick.
 */
public final class WorldEvent {
    private final String id;
    private final String type;
    private final String payload;
    private final long gameTime;

    public WorldEvent(String id, String type, String payload, long gameTime) {
        this.id = Objects.requireNonNull(id);
        this.type = type == null ? "generic" : type;
        this.payload = payload == null ? "" : payload;
        this.gameTime = gameTime;
    }

    public String id() { return id; }
    public String type() { return type; }
    public String payload() { return payload; }
    public long gameTime() { return gameTime; }
}
`},{path:`src/main/java/net/worldforge/combat/CombatCatalog.java`,content:`package net.worldforge.combat;

import net.minecraft.core.RegistryAccess;
import net.minecraft.core.registries.Registries;
import net.minecraft.resources.ResourceKey;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.damagesource.DamageType;
import net.minecraft.world.entity.EntityType;
import net.minecraft.world.entity.ai.attributes.Attribute;
import net.minecraftforge.registries.ForgeRegistries;
import net.worldforge.api.combat.AttributeInfo;
import net.worldforge.api.combat.CombatSnapshot;
import net.worldforge.api.combat.DamageTypeInfo;
import net.worldforge.api.combat.EntityCategoryCount;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Vanilla combat census. One-shot on server start via {@link RegistryAccess}
 * and official Forge registries. Third-party combat mods are not reverse-engineered.
 */
public final class CombatCatalog {
    private final List<DamageTypeInfo> damageTypes = new ArrayList<>();
    private final List<AttributeInfo> attributes = new ArrayList<>();
    private final List<EntityCategoryCount> entityCategories = new ArrayList<>();
    private final List<String> extraDetected = new ArrayList<>();
    private boolean vanillaBound;

    public void clear() {
        damageTypes.clear();
        attributes.clear();
        entityCategories.clear();
        extraDetected.clear();
        vanillaBound = false;
    }

    public void attach(RegistryAccess access) {
        clear();
        long start = System.nanoTime();
        access.registry(Registries.DAMAGE_TYPE).ifPresent(registry -> {
            for (Map.Entry<ResourceKey<DamageType>, DamageType> entry : registry.entrySet()) {
                DamageType type = entry.getValue();
                damageTypes.add(new DamageTypeInfo(
                        entry.getKey().location().toString(),
                        type.exhaustion(),
                        type.scaling().getSerializedName(),
                        type.effects().getSerializedName()
                ));
            }
        });
        if (ForgeRegistries.ATTRIBUTES != null) {
            for (Attribute attribute : ForgeRegistries.ATTRIBUTES) {
                ResourceLocation id = ForgeRegistries.ATTRIBUTES.getKey(attribute);
                if (id != null) {
                    attributes.add(new AttributeInfo(id.toString()));
                }
            }
        }
        Map<String, Integer> cats = new LinkedHashMap<>();
        if (ForgeRegistries.ENTITY_TYPES != null) {
            for (EntityType<?> type : ForgeRegistries.ENTITY_TYPES) {
                String cat = type.getCategory().getName();
                cats.merge(cat, 1, Integer::sum);
            }
        }
        for (Map.Entry<String, Integer> entry : cats.entrySet()) {
            entityCategories.add(new EntityCategoryCount(entry.getKey(), entry.getValue()));
        }
        vanillaBound = !damageTypes.isEmpty();
        long ms = (System.nanoTime() - start) / 1_000_000L;
        WorldForgeLog.info(LogCategory.PERFORMANCE,
                "Vanilla combat census: %d damage types, %d attributes, %d entity categories (%d ms)",
                damageTypes.size(), attributes.size(), entityCategories.size(), ms);
    }

    public void recordExtra(String modId) {
        if (modId != null && !modId.isBlank() && !extraDetected.contains(modId)) {
            extraDetected.add(modId);
        }
    }

    public void markVanillaBound() {
        vanillaBound = true;
    }

    public Collection<DamageTypeInfo> damageTypes() {
        return List.copyOf(damageTypes);
    }

    public Collection<AttributeInfo> attributes() {
        return List.copyOf(attributes);
    }

    public Collection<EntityCategoryCount> entityCategories() {
        return List.copyOf(entityCategories);
    }

    public CombatSnapshot snapshot() {
        return new CombatSnapshot(
                vanillaBound,
                damageTypes.size(),
                attributes.size(),
                entityCategories,
                extraDetected
        );
    }
}
`},{path:`src/main/java/net/worldforge/command/WorldForgeCommands.java`,content:`package net.worldforge.command;

import com.mojang.brigadier.Command;
import com.mojang.brigadier.arguments.StringArgumentType;
import com.mojang.brigadier.builder.LiteralArgumentBuilder;
import com.mojang.brigadier.exceptions.CommandSyntaxException;
import net.minecraft.commands.CommandSourceStack;
import net.minecraft.commands.Commands;
import net.minecraft.core.BlockPos;
import net.minecraft.network.chat.Component;
import net.minecraft.server.level.ServerPlayer;
import net.minecraftforge.event.RegisterCommandsEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.ModList;
import net.worldforge.WorldForge;
import net.worldforge.api.combat.CombatSnapshot;
import net.worldforge.api.integration.LoaderNote;
import net.worldforge.api.knowledge.PlayerRecord;
import net.worldforge.api.combat.DamageTypeInfo;
import net.worldforge.api.combat.EntityCategoryCount;
import net.worldforge.api.integration.AdapterDescriptor;
import net.worldforge.api.knowledge.KnowledgeStatus;
import net.worldforge.api.knowledge.ModKnowledge;
import net.worldforge.api.magic.MagicSystemDescriptor;
import net.worldforge.api.world.DimensionSnapshot;
import net.worldforge.api.world.PointOfInterest;
import net.worldforge.api.world.Region;
import net.worldforge.api.world.WorldEvent;
import net.worldforge.core.WorldForgeCore;

import java.util.Collection;
import java.util.function.Function;

/**
 * Operator diagnostics. Keep output short so it is usable on a busy server.
 */
public final class WorldForgeCommands {
    @SubscribeEvent
    public void onRegister(RegisterCommandsEvent event) {
        event.getDispatcher().register(root());
    }

    private LiteralArgumentBuilder<CommandSourceStack> root() {
        return Commands.literal("worldforge")
                .requires(src -> src.hasPermission(2))
                .then(Commands.literal("status").executes(ctx -> status(ctx.getSource())))
                .then(Commands.literal("discover").executes(ctx -> discover(ctx.getSource())))
                .then(Commands.literal("knowledge").executes(ctx -> knowledge(ctx.getSource())))
                .then(Commands.literal("world").executes(ctx -> world(ctx.getSource())))
                .then(Commands.literal("region")
                        .then(Commands.literal("list").executes(ctx -> regionList(ctx.getSource())))
                        .then(Commands.literal("here").executes(ctx -> regionHere(ctx.getSource()))))
                .then(Commands.literal("poi")
                        .then(Commands.literal("list").executes(ctx -> poiList(ctx.getSource())))
                        .then(Commands.literal("here").executes(ctx -> poiHere(ctx.getSource()))))
                .then(Commands.literal("event")
                        .then(Commands.literal("list").executes(ctx -> eventList(ctx.getSource())))
                        .then(Commands.argument("type", StringArgumentType.word())
                                .then(Commands.argument("payload", StringArgumentType.greedyString())
                                        .executes(ctx -> eventPost(
                                                ctx.getSource(),
                                                StringArgumentType.getString(ctx, "type"),
                                                StringArgumentType.getString(ctx, "payload"))))))
                .then(Commands.literal("magic").executes(ctx -> magic(ctx.getSource())))
                .then(Commands.literal("combat").executes(ctx -> combat(ctx.getSource())))
                .then(Commands.literal("player").executes(ctx -> players(ctx.getSource())))
                .then(Commands.literal("compat").executes(ctx -> compat(ctx.getSource())))
                .then(Commands.literal("bus").executes(ctx -> bus(ctx.getSource())))
                .then(Commands.literal("descriptors").executes(ctx -> descriptors(ctx.getSource())));
    }

    private int status(CommandSourceStack source) {
        WorldForgeCore core = WorldForge.core();
        int mods = core.discoveredMods().size();
        long known = core.knowledgeLayer().count(KnowledgeStatus.KNOWN);
        long partial = core.knowledgeLayer().count(KnowledgeStatus.PARTIALLY_KNOWN);
        long unknown = core.knowledgeLayer().count(KnowledgeStatus.UNKNOWN);
        CombatSnapshot combat = core.combatSnapshot();
        source.sendSuccess(() -> Component.literal(
                "WorldForge " + WorldForgeCore.VERSION
                        + " | mods " + mods
                        + " | known " + known
                        + " | partial " + partial
                        + " | unknown " + unknown
                        + " | regions " + core.regions().size()
                        + " | players " + core.players().size()
                        + " | magic " + core.magicSystems().size()
                        + " | damage-types " + combat.damageTypeCount()
                        + " | bus " + core.eventBus().subscriberCount()
                        + " | fingerprint " + core.discovery().fingerprint()
        ), false);
        return Command.SINGLE_SUCCESS;
    }

    private int discover(CommandSourceStack source) {
        WorldForge.core().runDiscovery();
        source.sendSuccess(() -> Component.literal("Discovery complete. " + WorldForge.core().discoveredMods().size() + " mods."), false);
        return Command.SINGLE_SUCCESS;
    }

    private int knowledge(CommandSourceStack source) {
        for (ModKnowledge entry : WorldForge.core().knowledgeLayer().all()) {
            String line = entry.mod().modId() + " @ " + entry.mod().version() + " — " + entry.status();
            source.sendSuccess(() -> Component.literal(line), false);
        }
        return Command.SINGLE_SUCCESS;
    }

    private int world(CommandSourceStack source) {
        DimensionSnapshot snap = WorldForge.core().dimensionSnapshot().orElse(null);
        if (snap == null) {
            source.sendFailure(Component.literal("No dimension snapshot — server world is not attached."));
            return 0;
        }
        source.sendSuccess(() -> Component.literal(
                snap.dimension() + " day " + snap.day()
                        + " t=" + snap.timeOfDay()
                        + " " + snap.weather()
                        + " " + snap.difficulty()
        ), false);
        return Command.SINGLE_SUCCESS;
    }

    private int regionList(CommandSourceStack source) {
        writeLines(source, WorldForge.core().regions(),
                r -> r.id() + " " + r.name() + " @ " + r.x() + "," + r.z() + " r=" + r.radius());
        return Command.SINGLE_SUCCESS;
    }

    private int regionHere(CommandSourceStack source) throws CommandSyntaxException {
        ServerPlayer player = source.getPlayerOrException();
        BlockPos pos = player.blockPosition();
        String dim = player.level().dimension().location().toString();
        String id = "region-" + pos.getX() + "-" + pos.getZ();
        WorldForge.core().registerRegion(new Region(id, "Marked " + id, dim, pos.getX(), pos.getZ(), 48, ""));
        source.sendSuccess(() -> Component.literal("Registered " + id), false);
        return Command.SINGLE_SUCCESS;
    }

    private int poiList(CommandSourceStack source) {
        writeLines(source, WorldForge.core().pointsOfInterest(),
                p -> p.id() + " " + p.kind() + " " + p.label() + " @ " + p.x() + "," + p.y() + "," + p.z());
        return Command.SINGLE_SUCCESS;
    }

    private int poiHere(CommandSourceStack source) throws CommandSyntaxException {
        ServerPlayer player = source.getPlayerOrException();
        BlockPos pos = player.blockPosition();
        String dim = player.level().dimension().location().toString();
        String regionId = WorldForge.core().world().regionAt(dim, pos.getX(), pos.getZ()).map(Region::id).orElse("");
        String id = "poi-" + pos.getX() + "-" + pos.getY() + "-" + pos.getZ();
        WorldForge.core().registerPointOfInterest(
                new PointOfInterest(id, regionId, "marker", "Marked location", dim, pos.getX(), pos.getY(), pos.getZ())
        );
        source.sendSuccess(() -> Component.literal("Registered " + id), false);
        return Command.SINGLE_SUCCESS;
    }

    private int eventList(CommandSourceStack source) {
        writeLines(source, WorldForge.core().recentWorldEvents(),
                e -> e.gameTime() + " " + e.type() + " " + e.payload());
        return Command.SINGLE_SUCCESS;
    }

    private int eventPost(CommandSourceStack source, String type, String payload) {
        WorldEvent posted = WorldForge.core().postWorldEvent(type, payload);
        source.sendSuccess(() -> Component.literal("Posted " + posted.id() + " " + posted.type()), false);
        return Command.SINGLE_SUCCESS;
    }

    private int magic(CommandSourceStack source) {
        Collection<MagicSystemDescriptor> systems = WorldForge.core().magicSystems();
        if (systems.isEmpty()) {
            source.sendSuccess(() -> Component.literal("No magic systems detected. Vanilla is not a magic mod."), false);
            return Command.SINGLE_SUCCESS;
        }
        writeLines(source, systems, s -> s.modId() + " " + s.status() + " caps=" + s.capabilities() + " — " + s.note());
        return Command.SINGLE_SUCCESS;
    }

    private int combat(CommandSourceStack source) {
        CombatSnapshot snap = WorldForge.core().combatSnapshot();
        Collection<DamageTypeInfo> types = WorldForge.core().damageTypes();
        if (types.isEmpty()) {
            source.sendSuccess(() -> Component.literal(
                    "Vanilla combat adapter is " + (snap.vanillaBound() ? "bound" : "unbound")
                            + " — load a world to census Registries.DAMAGE_TYPE."
            ), false);
            return Command.SINGLE_SUCCESS;
        }
        source.sendSuccess(() -> Component.literal(
                "Vanilla combat bound=" + snap.vanillaBound()
                        + " damage-types=" + snap.damageTypeCount()
                        + " attributes=" + snap.attributeCount()
                        + " extra=" + (snap.extraDetectedMods().isEmpty() ? "none" : snap.extraDetectedMods())
        ), false);
        for (EntityCategoryCount cat : snap.entityCategories()) {
            source.sendSuccess(() -> Component.literal("  entity " + cat.category() + "=" + cat.count()), false);
        }
        int n = 0;
        for (DamageTypeInfo type : types) {
            if (n++ >= 16) {
                source.sendSuccess(() -> Component.literal("… " + (types.size() - 16) + " more"), false);
                break;
            }
            String line = type.id() + " exh=" + type.exhaustion() + " " + type.scaling() + " " + type.effects();
            source.sendSuccess(() -> Component.literal(line), false);
        }
        return Command.SINGLE_SUCCESS;
    }

    private int players(CommandSourceStack source) {
        Collection<PlayerRecord> records = WorldForge.core().players();
        if (records.isEmpty()) {
            source.sendSuccess(() -> Component.literal("No player records. They are written on login."), false);
            return Command.SINGLE_SUCCESS;
        }
        writeLines(source, records, p -> p.name()
                + (p.online() ? " online" : " offline")
                + " logins=" + p.logins()
                + " dim=" + p.lastDimension()
                + " t=" + p.lastSeenDayTime());
        return Command.SINGLE_SUCCESS;
    }

    private int compat(CommandSourceStack source) {
        Collection<LoaderNote> notes = WorldForge.core().loaderNotes();
        if (notes.isEmpty()) {
            source.sendSuccess(() -> Component.literal("No loader notes."), false);
            return Command.SINGLE_SUCCESS;
        }
        for (LoaderNote note : notes) {
            boolean loaded = ModList.get().isLoaded(note.modId());
            String line = note.modId()
                    + " published=" + note.publishedLoader()
                    + " loaded=" + loaded
                    + " " + note.status()
                    + " — " + note.reason();
            source.sendSuccess(() -> Component.literal(line), false);
        }
        return Command.SINGLE_SUCCESS;
    }

    private int bus(CommandSourceStack source) {
        var eventBus = WorldForge.core().eventBus();
        source.sendSuccess(() -> Component.literal("WorldForge event bus subscribers=" + eventBus.subscriberCount()), false);
        writeLines(source, eventBus.recent(), s -> s);
        return Command.SINGLE_SUCCESS;
    }

    private int descriptors(CommandSourceStack source) {
        Collection<AdapterDescriptor> all = WorldForge.core().adapterDescriptors();
        if (all.isEmpty()) {
            source.sendSuccess(() -> Component.literal("No adapter descriptors loaded."), false);
            return Command.SINGLE_SUCCESS;
        }
        writeLines(source, all, d -> d.id() + " " + d.domain() + " policy=" + d.bindPolicy() + " targets=" + d.targets());
        return Command.SINGLE_SUCCESS;
    }

    private static <T> void writeLines(CommandSourceStack source, Collection<T> items, Function<T, String> line) {
        if (items.isEmpty()) {
            source.sendSuccess(() -> Component.literal("(none)"), false);
            return;
        }
        for (T item : items) {
            String text = line.apply(item);
            source.sendSuccess(() -> Component.literal(text), false);
        }
    }
}
`},{path:`src/main/java/net/worldforge/core/WorldForgeCore.java`,content:`package net.worldforge.core;

import net.minecraft.server.MinecraftServer;
import net.worldforge.api.WorldForgeAPI;
import net.worldforge.api.combat.CombatSnapshot;
import net.worldforge.api.combat.DamageTypeInfo;
import net.worldforge.api.discovery.DiscoveredMod;
import net.worldforge.api.event.EngineEvent;
import net.worldforge.api.event.WorldForgeEventBus;
import net.worldforge.api.integration.Adapter;
import net.worldforge.api.integration.AdapterDescriptor;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.api.integration.LoaderNote;
import net.worldforge.api.knowledge.ModKnowledge;
import net.worldforge.api.knowledge.PlayerRecord;
import net.worldforge.api.magic.MagicSystemDescriptor;
import net.worldforge.api.world.DimensionSnapshot;
import net.worldforge.api.world.PointOfInterest;
import net.worldforge.api.world.Region;
import net.worldforge.api.world.WorldEvent;
import net.worldforge.combat.CombatCatalog;
import net.worldforge.core.config.WorldForgeConfig;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.core.services.ServiceRegistry;
import net.worldforge.discovery.ModDiscoveryService;
import net.worldforge.integration.IntegrationManager;
import net.worldforge.integration.LoaderCompatibilityCatalog;
import net.worldforge.knowledge.KnowledgeLayer;
import net.worldforge.magic.MagicCatalog;
import net.worldforge.world.WorldStateService;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Orchestrates discovery, knowledge, adapters, and world persistence.
 * Deliberately not a god-object: each concern is a dedicated service.
 */
public final class WorldForgeCore implements WorldForgeAPI {
    public static final String VERSION = "0.4.0";

    private final ServiceRegistry services = new ServiceRegistry();
    private final ModDiscoveryService discovery = new ModDiscoveryService();
    private final KnowledgeLayer knowledge = new KnowledgeLayer();
    private final MagicCatalog magic = new MagicCatalog();
    private final CombatCatalog combat = new CombatCatalog();
    private final IntegrationManager integrations = new IntegrationManager(magic, combat);
    private final WorldStateService world = new WorldStateService();
    private final WorldForgeEventBus bus = new WorldForgeEventBus();
    private boolean bootstrapped;

    public WorldForgeCore() {
        services.register(ModDiscoveryService.class, discovery);
        services.register(KnowledgeLayer.class, knowledge);
        services.register(MagicCatalog.class, magic);
        services.register(CombatCatalog.class, combat);
        services.register(IntegrationManager.class, integrations);
        services.register(WorldStateService.class, world);
        services.register(WorldForgeEventBus.class, bus);
        bus.subscribe((event, detail) -> WorldForgeLog.debug(LogCategory.CORE, "bus %s %s", event, detail));
    }

    public ServiceRegistry services() {
        return services;
    }

    public synchronized void bootstrap() {
        if (bootstrapped) {
            return;
        }
        WorldForgeLog.info(LogCategory.CORE, "WorldForge %s — player knowledge + loader mismatch catalog", VERSION);
        if (WorldForgeConfig.discoveryOnStartup()) {
            runDiscovery();
        }
        bootstrapped = true;
    }

    public synchronized void runDiscovery() {
        discovery.discoverLoaderMetadata();
        discovery.censusForgeRegistries();
        integrations.registerDefaults();
        integrations.bindAll();
        rebuildKnowledge();
        for (Adapter adapter : integrations.adapters()) {
            AdapterState state = integrations.stateOf(adapter);
            if (state == AdapterState.BOUND) {
                emit(EngineEvent.ADAPTER_BOUND, adapter.id() + " -> " + adapter.boundTarget());
            } else {
                emit(EngineEvent.ADAPTER_SKIPPED, adapter.id() + " " + state);
            }
        }
        emit(EngineEvent.DISCOVERY_COMPLETE, discovery.fingerprint());
    }

    public synchronized void onServerStarted(MinecraftServer server) {
        discovery.censusDatapackRegistries(server);
        if (WorldForgeConfig.combatEnabled()) {
            combat.attach(server.registryAccess());
        }
        rebuildKnowledge();
        world.attach(server, discovery);
        emit(EngineEvent.KNOWLEDGE_RECONCILED, discovery.fingerprint());
        emit(EngineEvent.WORLD_LOAD, world.snapshot().map(DimensionSnapshot::dimension).orElse("overworld"));
    }

    public synchronized void onServerStopping() {
        emit(EngineEvent.WORLD_SAVE, "overworld");
        world.detach();
        combat.clear();
    }

    public void emit(EngineEvent event, String detail) {
        WorldForgeLog.debug(LogCategory.CORE, "%s %s", event, detail == null ? "" : detail);
        bus.publish(event, detail);
    }

    private void rebuildKnowledge() {
        knowledge.clear();
        for (DiscoveredMod mod : discovery.mods()) {
            boolean platform = isPlatform(mod.modId());
            Adapter adapter = platform ? null : findAdapterFor(mod.modId());
            AdapterState raw = adapter == null ? AdapterState.UNBOUND : integrations.stateOf(adapter);
            boolean thisModBound = adapter != null
                    && raw == AdapterState.BOUND
                    && mod.modId().equals(adapter.boundTarget());
            AdapterState state = thisModBound
                    ? AdapterState.BOUND
                    : (raw == AdapterState.BOUND ? AdapterState.SKIPPED_NO_API : raw);
            String adapterId = thisModBound ? adapter.id() : null;
            List<IntegrationDomain> domains = adapter == null ? List.of() : List.of(adapter.domain());
            List<String> apis = detectApis(mod, adapter, state, thisModBound);
            knowledge.classify(mod, discovery.census(mod.modId()), apis, domains, state, adapterId);
        }
        WorldForgeLog.info(LogCategory.DISCOVERY, "Knowledge: %d known, %d partial, %d unknown",
                knowledge.count(net.worldforge.api.knowledge.KnowledgeStatus.KNOWN),
                knowledge.count(net.worldforge.api.knowledge.KnowledgeStatus.PARTIALLY_KNOWN),
                knowledge.count(net.worldforge.api.knowledge.KnowledgeStatus.UNKNOWN));
    }

    private static boolean isPlatform(String modId) {
        return "minecraft".equals(modId) || "forge".equals(modId) || "worldforge".equals(modId);
    }

    private Adapter findAdapterFor(String modId) {
        for (Adapter adapter : integrations.adapters()) {
            if (adapter.targetModIds().contains(modId)) {
                return adapter;
            }
        }
        return null;
    }

    private static List<String> detectApis(DiscoveredMod mod, Adapter adapter, AdapterState state, boolean thisModBound) {
        if (thisModBound) {
            return List.of(adapter.id());
        }
        if (adapter != null && state == AdapterState.SKIPPED_NO_API) {
            return List.of("detected-target:" + adapter.id());
        }
        if ("jei".equals(mod.modId()) || "curios".equals(mod.modId())) {
            return List.of("loader-visible-api");
        }
        return List.of();
    }

    @Override
    public Collection<DiscoveredMod> discoveredMods() {
        return discovery.mods();
    }

    @Override
    public Optional<DiscoveredMod> mod(String modId) {
        return discovery.get(modId);
    }

    @Override
    public Optional<ModKnowledge> knowledge(String modId) {
        return knowledge.get(modId);
    }

    @Override
    public KnowledgeLayer knowledgeLayer() {
        return knowledge;
    }

    @Override
    public Optional<Adapter> adapter(IntegrationDomain domain) {
        return integrations.byDomain(domain);
    }

    @Override
    public boolean isIntegrationBound(String modId) {
        Adapter adapter = findAdapterFor(modId);
        return adapter != null && adapter.isBound() && modId.equals(adapter.boundTarget());
    }

    @Override
    public Optional<DimensionSnapshot> dimensionSnapshot() {
        world.refreshSnapshot();
        return world.snapshot();
    }

    @Override
    public Collection<Region> regions() {
        return world.regions();
    }

    @Override
    public Optional<Region> region(String id) {
        return world.region(id);
    }

    @Override
    public Collection<PointOfInterest> pointsOfInterest() {
        return world.pointsOfInterest();
    }

    @Override
    public Collection<WorldEvent> recentWorldEvents() {
        return world.recentEvents();
    }

    @Override
    public Collection<PlayerRecord> players() {
        return world.players();
    }

    @Override
    public Optional<PlayerRecord> player(String uuid) {
        return world.player(uuid);
    }

    @Override
    public boolean registerRegion(Region region) {
        boolean ok = world.registerRegion(region);
        if (ok) {
            emit(EngineEvent.REGION_REGISTERED, region.id());
        }
        return ok;
    }

    @Override
    public boolean registerPointOfInterest(PointOfInterest poi) {
        boolean ok = world.registerPoi(poi);
        if (ok) {
            emit(EngineEvent.POI_REGISTERED, poi.id());
        }
        return ok;
    }

    @Override
    public WorldEvent postWorldEvent(String type, String payload) {
        WorldEvent event = world.postEvent(type, payload);
        emit(EngineEvent.WORLD_EVENT, event.type() + " " + event.payload());
        return event;
    }

    @Override
    public Collection<MagicSystemDescriptor> magicSystems() {
        return magic.detected();
    }

    @Override
    public Collection<DamageTypeInfo> damageTypes() {
        return combat.damageTypes();
    }

    @Override
    public CombatSnapshot combatSnapshot() {
        return combat.snapshot();
    }

    @Override
    public WorldForgeEventBus eventBus() {
        return bus;
    }

    @Override
    public Collection<AdapterDescriptor> adapterDescriptors() {
        return integrations.descriptors();
    }

    @Override
    public Collection<LoaderNote> loaderNotes() {
        return LoaderCompatibilityCatalog.all();
    }

    public ModDiscoveryService discovery() {
        return discovery;
    }

    public IntegrationManager integrations() {
        return integrations;
    }

    public WorldStateService world() {
        return world;
    }
}
`},{path:`src/main/java/net/worldforge/core/config/WorldForgeConfig.java`,content:`package net.worldforge.core.config;

import net.minecraftforge.common.ForgeConfigSpec;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.config.ModConfigEvent;
import net.worldforge.WorldForgeMod;

@Mod.EventBusSubscriber(modid = WorldForgeMod.MOD_ID, bus = Mod.EventBusSubscriber.Bus.MOD)
public final class WorldForgeConfig {
    private static final ForgeConfigSpec.Builder BUILDER = new ForgeConfigSpec.Builder();

    private static final ForgeConfigSpec.BooleanValue DEBUG_MODE = BUILDER
            .comment("Verbose WorldForge logging. Leave off on production servers.")
            .define("debugMode", false);

    private static final ForgeConfigSpec.BooleanValue DISCOVERY_ON_STARTUP = BUILDER
            .comment("Scan installed mods and Forge registries during common setup.")
            .define("discoveryOnStartup", true);

    private static final ForgeConfigSpec.BooleanValue SCAN_DATAPACK_REGISTRIES = BUILDER
            .comment("When a server starts, census biomes, enchantments, and structures. Cheap; runs once per load.")
            .define("scanDatapackRegistries", true);

    private static final ForgeConfigSpec.BooleanValue MAGIC = BUILDER
            .comment("Allow the magic-system adapter to bind when a supported mod is present.")
            .define("integrations.magic", true);

    private static final ForgeConfigSpec.BooleanValue COMBAT = BUILDER
            .comment("Allow the combat adapter to bind when a supported mod is present.")
            .define("integrations.combat", true);

    private static final ForgeConfigSpec.BooleanValue TECHNOLOGY = BUILDER
            .comment("Allow the technology adapter to bind when a supported mod is present.")
            .define("integrations.technology", true);

    private static final ForgeConfigSpec.BooleanValue QUEST = BUILDER
            .comment("Allow the quest adapter to bind when a supported mod is present.")
            .define("integrations.quest", true);

    private static final ForgeConfigSpec.BooleanValue WORLDGEN = BUILDER
            .comment("Allow the worldgen adapter to bind when a supported mod is present.")
            .define("integrations.worldgen", true);

    private static final ForgeConfigSpec.BooleanValue EXPERIMENTAL = BUILDER
            .comment("Subscribe to high-volume Forge events (block/entity). Off by default for performance.")
            .define("experimentalFeatures", false);

    public static final ForgeConfigSpec SPEC = BUILDER.build();

    private static boolean debugMode;
    private static boolean discoveryOnStartup;
    private static boolean scanDatapackRegistries;
    private static boolean magic;
    private static boolean combat;
    private static boolean technology;
    private static boolean quest;
    private static boolean worldgen;
    private static boolean experimental;

    private WorldForgeConfig() {}

    public static boolean debugMode() { return debugMode; }
    public static boolean discoveryOnStartup() { return discoveryOnStartup; }
    public static boolean scanDatapackRegistries() { return scanDatapackRegistries; }
    public static boolean magicEnabled() { return magic; }
    public static boolean combatEnabled() { return combat; }
    public static boolean technologyEnabled() { return technology; }
    public static boolean questEnabled() { return quest; }
    public static boolean worldgenEnabled() { return worldgen; }
    public static boolean experimentalFeatures() { return experimental; }

    @SubscribeEvent
    static void onLoad(final ModConfigEvent event) {
        if (event.getConfig().getSpec() != SPEC) {
            return;
        }
        debugMode = DEBUG_MODE.get();
        discoveryOnStartup = DISCOVERY_ON_STARTUP.get();
        scanDatapackRegistries = SCAN_DATAPACK_REGISTRIES.get();
        magic = MAGIC.get();
        combat = COMBAT.get();
        technology = TECHNOLOGY.get();
        quest = QUEST.get();
        worldgen = WORLDGEN.get();
        experimental = EXPERIMENTAL.get();
    }
}
`},{path:`src/main/java/net/worldforge/core/logging/LogCategory.java`,content:`package net.worldforge.core.logging;

public enum LogCategory {
    CORE("WorldForge"),
    DISCOVERY("WorldForge:Discovery"),
    INTEGRATION("WorldForge:Integration"),
    WORLD("WorldForge:World"),
    PERFORMANCE("WorldForge:Performance"),
    COMPATIBILITY("WorldForge:Compatibility");

    private final String prefix;

    LogCategory(String prefix) {
        this.prefix = prefix;
    }

    public String prefix() {
        return prefix;
    }
}
`},{path:`src/main/java/net/worldforge/core/logging/WorldForgeLog.java`,content:`package net.worldforge.core.logging;

import com.mojang.logging.LogUtils;
import net.worldforge.core.config.WorldForgeConfig;
import org.slf4j.Logger;

/**
 * Structured logging. Debug lines are gated so a busy modpack does not drown
 * the console during normal play.
 */
public final class WorldForgeLog {
    private static final Logger LOGGER = LogUtils.getLogger();

    private WorldForgeLog() {}

    public static void info(LogCategory category, String message, Object... args) {
        LOGGER.info("[{}] {}", category.prefix(), format(message, args));
    }

    public static void warn(LogCategory category, String message, Object... args) {
        LOGGER.warn("[{}] {}", category.prefix(), format(message, args));
    }

    public static void error(LogCategory category, String message, Throwable error) {
        LOGGER.error("[{}] {}", category.prefix(), message, error);
    }

    public static void debug(LogCategory category, String message, Object... args) {
        if (WorldForgeConfig.debugMode()) {
            LOGGER.debug("[{}] {}", category.prefix(), format(message, args));
        }
    }

    private static String format(String message, Object... args) {
        if (args == null || args.length == 0) {
            return message;
        }
        try {
            return String.format(message, args);
        } catch (RuntimeException ex) {
            return message;
        }
    }
}
`},{path:`src/main/java/net/worldforge/core/services/ServiceRegistry.java`,content:`package net.worldforge.core.services;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Tiny in-process service locator for WorldForge internals.
 * Not a replacement for Forge registries.
 */
public final class ServiceRegistry {
    private final Map<Class<?>, Object> services = new ConcurrentHashMap<>();

    public <T> void register(Class<T> type, T instance) {
        services.put(Objects.requireNonNull(type), Objects.requireNonNull(instance));
    }

    public <T> Optional<T> get(Class<T> type) {
        return Optional.ofNullable(type.cast(services.get(type)));
    }

    public <T> T require(Class<T> type) {
        return get(type).orElseThrow(() -> new IllegalStateException("Missing WorldForge service: " + type.getName()));
    }
}
`},{path:`src/main/java/net/worldforge/discovery/ModDiscoveryService.java`,content:`package net.worldforge.discovery;

import net.minecraft.server.MinecraftServer;
import net.minecraftforge.fml.ModList;
import net.minecraftforge.forgespi.language.IModInfo;
import net.worldforge.api.discovery.DiscoveredMod;
import net.worldforge.api.discovery.RegistryCensus;
import net.worldforge.core.config.WorldForgeConfig;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Discovers installed mods from Forge's loader metadata, then optionally
 * censuses registries. Never assumes a mod's mechanics from its id alone.
 */
public final class ModDiscoveryService {
    private final RegistryProbe probe = new RegistryProbe();
    private final Map<String, DiscoveredMod> mods = new LinkedHashMap<>();
    private final Map<String, RegistryCensus> censuses = new LinkedHashMap<>();
    private String fingerprint = "";

    public synchronized List<DiscoveredMod> discoverLoaderMetadata() {
        mods.clear();
        censuses.clear();
        long start = System.nanoTime();

        for (IModInfo info : ModList.get().getMods()) {
            DiscoveredMod discovered = toDiscovered(info);
            mods.put(discovered.modId(), discovered);
        }

        fingerprint = computeFingerprint();
        long ms = (System.nanoTime() - start) / 1_000_000L;
        WorldForgeLog.info(LogCategory.DISCOVERY, "Loader metadata: %d mods, fingerprint %s (%d ms)",
                mods.size(), fingerprint, ms);
        return List.copyOf(mods.values());
    }

    public synchronized void censusForgeRegistries() {
        long start = System.nanoTime();
        for (String modId : mods.keySet()) {
            censuses.put(modId, probe.probeForgeRegistries(modId));
        }
        long ms = (System.nanoTime() - start) / 1_000_000L;
        WorldForgeLog.info(LogCategory.PERFORMANCE, "Forge registry census for %d namespaces in %d ms", mods.size(), ms);
    }

    public synchronized void censusDatapackRegistries(MinecraftServer server) {
        if (!WorldForgeConfig.scanDatapackRegistries()) {
            return;
        }
        long start = System.nanoTime();
        var access = server.registryAccess();
        for (String modId : mods.keySet()) {
            RegistryCensus base = censuses.getOrDefault(modId, RegistryCensus.empty());
            censuses.put(modId, probe.enrichDatapack(base, access, modId));
        }
        long ms = (System.nanoTime() - start) / 1_000_000L;
        WorldForgeLog.info(LogCategory.PERFORMANCE, "Datapack registry census in %d ms", ms);
    }

    public Collection<DiscoveredMod> mods() {
        return List.copyOf(mods.values());
    }

    public Optional<DiscoveredMod> get(String modId) {
        return Optional.ofNullable(mods.get(modId));
    }

    public RegistryCensus census(String modId) {
        return censuses.getOrDefault(modId, RegistryCensus.empty());
    }

    public String fingerprint() {
        return fingerprint;
    }

    public boolean isLoaded(String modId) {
        return ModList.get().isLoaded(modId);
    }

    private static DiscoveredMod toDiscovered(IModInfo info) {
        List<DiscoveredMod.Dependency> deps = new ArrayList<>();
        for (IModInfo.ModVersion dep : info.getDependencies()) {
            deps.add(new DiscoveredMod.Dependency(
                    dep.getModId(),
                    String.valueOf(dep.getVersionRange()),
                    dep.isMandatory()
            ));
        }
        return new DiscoveredMod(
                info.getModId(),
                info.getDisplayName(),
                String.valueOf(info.getVersion()),
                info.getDescription() == null ? "" : info.getDescription(),
                deps
        );
    }

    private String computeFingerprint() {
        StringBuilder sb = new StringBuilder(mods.size() * 16);
        mods.values().stream()
                .sorted((a, b) -> a.modId().compareTo(b.modId()))
                .forEach(mod -> sb.append(mod.modId()).append('@').append(mod.version()).append(';'));
        return Integer.toHexString(sb.toString().hashCode());
    }
}
`},{path:`src/main/java/net/worldforge/discovery/RegistryProbe.java`,content:`package net.worldforge.discovery;

import net.minecraft.core.Registry;
import net.minecraft.core.RegistryAccess;
import net.minecraft.core.registries.Registries;
import net.minecraft.resources.ResourceLocation;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.IForgeRegistry;
import net.worldforge.api.discovery.RegistryCensus;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

/**
 * One-shot registry census. Results are cached by the discovery service;
 * this class never ticks and never scans the whole world.
 */
public final class RegistryProbe {
    public RegistryCensus probeForgeRegistries(String namespace) {
        return new RegistryCensus(
                count(ForgeRegistries.BLOCKS, namespace),
                count(ForgeRegistries.ITEMS, namespace),
                count(ForgeRegistries.ENTITY_TYPES, namespace),
                count(ForgeRegistries.MOB_EFFECTS, namespace),
                count(ForgeRegistries.RECIPE_SERIALIZERS, namespace),
                0,
                0,
                0
        );
    }

    public RegistryCensus enrichDatapack(RegistryCensus base, RegistryAccess access, String namespace) {
        int biomes = countDatapack(access, Registries.BIOME, namespace);
        int enchantments = countDatapack(access, Registries.ENCHANTMENT, namespace);
        int structures = countDatapack(access, Registries.STRUCTURE, namespace);
        WorldForgeLog.debug(LogCategory.DISCOVERY, "Datapack census %s biomes=%d enchantments=%d structures=%d",
                namespace, biomes, enchantments, structures);
        return base.withDatapack(biomes, enchantments, structures);
    }

    private static int count(IForgeRegistry<?> registry, String namespace) {
        if (registry == null) {
            return 0;
        }
        int n = 0;
        for (ResourceLocation id : registry.getKeys()) {
            if (namespace.equals(id.getNamespace())) {
                n++;
            }
        }
        return n;
    }

    private static <T> int countDatapack(RegistryAccess access, net.minecraft.resources.ResourceKey<Registry<T>> key, String namespace) {
        return access.registry(key).map(registry -> {
            int n = 0;
            for (ResourceLocation id : registry.keySet()) {
                if (namespace.equals(id.getNamespace())) {
                    n++;
                }
            }
            return n;
        }).orElse(0);
    }
}
`},{path:`src/main/java/net/worldforge/event/EventRouter.java`,content:`package net.worldforge.event;

import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraftforge.event.entity.player.PlayerEvent;
import net.minecraftforge.event.server.ServerStartedEvent;
import net.minecraftforge.event.server.ServerStoppingEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.worldforge.api.event.EngineEvent;
import net.worldforge.core.WorldForgeCore;
import net.worldforge.core.config.WorldForgeConfig;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

/**
 * Narrow Forge subscription set. High-volume events stay behind the
 * experimental config flag and are not registered in this class at all
 * until that work lands — avoiding a hidden tick cost.
 */
public final class EventRouter {
    private final WorldForgeCore core;

    public EventRouter(WorldForgeCore core) {
        this.core = core;
    }

    @SubscribeEvent
    public void onServerStarted(ServerStartedEvent event) {
        WorldForgeLog.info(LogCategory.WORLD, "Server started");
        core.onServerStarted(event.getServer());
        core.emit(EngineEvent.SERVER_START, "server");
    }

    @SubscribeEvent
    public void onServerStopping(ServerStoppingEvent event) {
        core.onServerStopping();
        core.emit(EngineEvent.SERVER_STOP, "server");
    }

    @SubscribeEvent
    public void onPlayerLogin(PlayerEvent.PlayerLoggedInEvent event) {
        if (!(event.getEntity() instanceof ServerPlayer player)) {
            return;
        }
        core.world().refreshSnapshot();
        String name = player.getGameProfile().getName();
        String dimension = player.level().dimension().location().toString();
        core.world().noteLogin(player.getUUID().toString(), name, dimension, player.serverLevel().getDayTime());
        core.emit(EngineEvent.PLAYER_LOGIN, name);
    }

    @SubscribeEvent
    public void onPlayerLogout(PlayerEvent.PlayerLoggedOutEvent event) {
        if (!(event.getEntity() instanceof ServerPlayer player)) {
            return;
        }
        String name = player.getGameProfile().getName();
        long time = player.level() instanceof ServerLevel level ? level.getDayTime() : 0L;
        core.world().noteLogout(player.getUUID().toString(), time);
        core.emit(EngineEvent.PLAYER_LOGOUT, name);
    }

    @SubscribeEvent
    public void onPlayerChangeDimension(PlayerEvent.PlayerChangedDimensionEvent event) {
        if (!(event.getEntity() instanceof ServerPlayer player)) {
            return;
        }
        String name = player.getGameProfile().getName();
        String dimension = event.getTo().location().toString();
        core.world().noteDimension(player.getUUID().toString(), name, dimension, player.serverLevel().getDayTime());
        core.emit(EngineEvent.DIMENSION_CHANGE, name + " -> " + dimension);
    }

    public static boolean experimentalEnabled() {
        return WorldForgeConfig.experimentalFeatures();
    }
}
`},{path:`src/main/java/net/worldforge/integration/DescriptorCatalog.java`,content:`package net.worldforge.integration;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import net.worldforge.api.integration.AdapterDescriptor;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Loads adapter descriptors from {@code /data/worldforge/adapters/*.json}.
 * Missing or malformed files never fail WorldForge load.
 */
public final class DescriptorCatalog {
    private static final String[] FILES = {
            "/data/worldforge/adapters/magic.json",
            "/data/worldforge/adapters/combat.json",
            "/data/worldforge/adapters/technology.json",
            "/data/worldforge/adapters/quest.json",
            "/data/worldforge/adapters/worldgen.json"
    };

    private final List<AdapterDescriptor> descriptors = new ArrayList<>();

    public void load() {
        descriptors.clear();
        for (String path : FILES) {
            try (InputStream in = DescriptorCatalog.class.getResourceAsStream(path)) {
                if (in == null) {
                    WorldForgeLog.debug(LogCategory.INTEGRATION, "Adapter descriptor missing: %s", path);
                    continue;
                }
                JsonObject obj = JsonParser.parseReader(new InputStreamReader(in, StandardCharsets.UTF_8)).getAsJsonObject();
                descriptors.add(parse(obj));
            } catch (Exception ex) {
                WorldForgeLog.error(LogCategory.INTEGRATION, "Failed to read adapter descriptor " + path + " — skipping", ex);
            }
        }
        WorldForgeLog.info(LogCategory.INTEGRATION, "Adapter descriptors loaded: %d", descriptors.size());
    }

    public Collection<AdapterDescriptor> all() {
        return List.copyOf(descriptors);
    }

    private static AdapterDescriptor parse(JsonObject obj) {
        String id = obj.get("id").getAsString();
        IntegrationDomain domain = IntegrationDomain.valueOf(obj.get("domain").getAsString());
        List<String> targets = new ArrayList<>();
        JsonArray arr = obj.getAsJsonArray("targets");
        if (arr != null) {
            for (JsonElement el : arr) {
                targets.add(el.getAsString());
            }
        }
        String policy = obj.has("bindPolicy") ? obj.get("bindPolicy").getAsString() : "documented-api-only";
        String notes = obj.has("notes") ? obj.get("notes").getAsString() : "";
        return new AdapterDescriptor(id, domain, targets, policy, notes);
    }
}
`},{path:`src/main/java/net/worldforge/integration/IntegrationManager.java`,content:`package net.worldforge.integration;

import net.worldforge.api.integration.Adapter;
import net.worldforge.api.integration.AdapterDescriptor;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.combat.CombatCatalog;
import net.worldforge.core.config.WorldForgeConfig;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.integration.adapters.CombatSystemAdapter;
import net.worldforge.integration.adapters.MagicSystemAdapter;
import net.worldforge.integration.adapters.QuestAdapter;
import net.worldforge.integration.adapters.TechnologyAdapter;
import net.worldforge.integration.adapters.WorldgenAdapter;
import net.worldforge.magic.MagicCatalog;

import java.util.ArrayList;
import java.util.Collection;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Owns optional adapters. A missing target never fails WorldForge load.
 */
public final class IntegrationManager {
    private final List<Adapter> adapters = new ArrayList<>();
    private final Map<IntegrationDomain, Adapter> byDomain = new EnumMap<>(IntegrationDomain.class);
    private final MagicCatalog magicCatalog;
    private final CombatCatalog combatCatalog;
    private final DescriptorCatalog descriptors = new DescriptorCatalog();

    public IntegrationManager(MagicCatalog magicCatalog, CombatCatalog combatCatalog) {
        this.magicCatalog = magicCatalog;
        this.combatCatalog = combatCatalog;
    }

    public void registerDefaults() {
        adapters.clear();
        byDomain.clear();
        descriptors.load();
        register(new MagicSystemAdapter(WorldForgeConfig.magicEnabled(), magicCatalog));
        register(new CombatSystemAdapter(WorldForgeConfig.combatEnabled(), combatCatalog));
        register(new TechnologyAdapter(WorldForgeConfig.technologyEnabled()));
        register(new QuestAdapter(WorldForgeConfig.questEnabled()));
        register(new WorldgenAdapter(WorldForgeConfig.worldgenEnabled()));
    }

    public void register(Adapter adapter) {
        adapters.add(adapter);
        byDomain.put(adapter.domain(), adapter);
    }

    public void bindAll() {
        int bound = 0;
        for (Adapter adapter : adapters) {
            try {
                if (adapter.tryBind()) {
                    bound++;
                }
            } catch (RuntimeException ex) {
                WorldForgeLog.error(LogCategory.INTEGRATION, "Adapter " + adapter.id() + " failed; continuing", ex);
                adapter.unbind();
            }
        }
        WorldForgeLog.info(LogCategory.INTEGRATION, "Adapters bound: %d / %d", bound, adapters.size());
    }

    public List<Adapter> adapters() {
        return List.copyOf(adapters);
    }

    public Optional<Adapter> byDomain(IntegrationDomain domain) {
        return Optional.ofNullable(byDomain.get(domain));
    }

    public AdapterState stateOf(Adapter adapter) {
        if (adapter instanceof NoOpAdapter noOp) {
            return noOp.state();
        }
        return adapter.isBound() ? AdapterState.BOUND : AdapterState.UNBOUND;
    }

    public MagicCatalog magic() {
        return magicCatalog;
    }

    public CombatCatalog combat() {
        return combatCatalog;
    }

    public Collection<AdapterDescriptor> descriptors() {
        return descriptors.all();
    }
}
`},{path:`src/main/java/net/worldforge/integration/LoaderCompatibilityCatalog.java`,content:`package net.worldforge.integration;

import net.worldforge.api.integration.LoaderNote;
import net.worldforge.api.integration.PublishedLoader;
import net.worldforge.api.knowledge.KnowledgeStatus;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Static record of loader mismatches. WorldForge is a Forge 1.21.1 mod.
 * Compiling a NeoForge API into this jar would be a hard wrong-loader dependency,
 * so these entries stay PARTIALLY_KNOWN and are never bound.
 */
public final class LoaderCompatibilityCatalog {
    private static final List<LoaderNote> NOTES = List.of(
            new LoaderNote(
                    "ars_nouveau",
                    PublishedLoader.NEOFORGE,
                    KnowledgeStatus.PARTIALLY_KNOWN,
                    "Ars Nouveau 1.21.x publishes its API on NeoForge (net.neoforged), including ArsNouveauAPI. "
                            + "WorldForge targets Forge 52.1.0 and does not compile that API. Capabilities stay empty."
            ),
            new LoaderNote(
                    "irons_spellbooks",
                    PublishedLoader.NEOFORGE,
                    KnowledgeStatus.PARTIALLY_KNOWN,
                    "Iron's Spells documents a Forge API for 1.20.1 and below. The 1.21 line is NeoForge. "
                            + "WorldForge will not bind it on Forge 1.21.1."
            )
    );

    private LoaderCompatibilityCatalog() {}

    public static Collection<LoaderNote> all() {
        return NOTES;
    }

    public static Optional<LoaderNote> find(String modId) {
        if (modId == null) {
            return Optional.empty();
        }
        for (LoaderNote note : NOTES) {
            if (note.modId().equals(modId)) {
                return Optional.of(note);
            }
        }
        return Optional.empty();
    }
}
`},{path:`src/main/java/net/worldforge/integration/NoOpAdapter.java`,content:`package net.worldforge.integration;

import net.minecraftforge.fml.ModList;
import net.worldforge.api.integration.Adapter;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

import java.util.Set;

/**
 * Adapter that records a target as present/absent without calling into it.
 * Used when WorldForge recognises a domain but has no official API binding yet.
 */
public class NoOpAdapter implements Adapter {
    private final String id;
    private final IntegrationDomain domain;
    private final Set<String> targets;
    private final boolean enabled;
    private AdapterState state = AdapterState.UNBOUND;
    private String boundTarget;

    public NoOpAdapter(String id, IntegrationDomain domain, Set<String> targets, boolean enabled) {
        this.id = id;
        this.domain = domain;
        this.targets = Set.copyOf(targets);
        this.enabled = enabled;
    }

    @Override
    public String id() {
        return id;
    }

    @Override
    public IntegrationDomain domain() {
        return domain;
    }

    @Override
    public Set<String> targetModIds() {
        return targets;
    }

    @Override
    public boolean isBound() {
        return state == AdapterState.BOUND;
    }

    @Override
    public String boundTarget() {
        return boundTarget;
    }

    public AdapterState state() {
        return state;
    }

    @Override
    public boolean tryBind() {
        if (!enabled) {
            state = AdapterState.SKIPPED_DISABLED;
            WorldForgeLog.debug(LogCategory.INTEGRATION, "%s disabled by config", id);
            return false;
        }
        String present = firstLoadedTarget();
        if (present == null) {
            state = AdapterState.SKIPPED_MISSING_TARGET;
            WorldForgeLog.debug(LogCategory.INTEGRATION, "%s: no target loaded among %s", id, targets);
            return false;
        }
        // Honest: presence is not an API. Subclasses that actually bind should override.
        state = AdapterState.SKIPPED_NO_API;
        WorldForgeLog.info(LogCategory.INTEGRATION,
                "%s found %s but has no official API binding yet — leaving PARTIALLY_KNOWN", id, present);
        return false;
    }

    @Override
    public void unbind() {
        state = AdapterState.UNBOUND;
        boundTarget = null;
    }

    protected boolean enabled() {
        return enabled;
    }

    protected void setState(AdapterState state) {
        this.state = state;
    }

    protected String firstLoadedTarget() {
        for (String target : targets) {
            if (ModList.get().isLoaded(target)) {
                return target;
            }
        }
        return null;
    }

    protected void markBound(String target) {
        this.state = AdapterState.BOUND;
        this.boundTarget = target;
    }
}
`},{path:`src/main/java/net/worldforge/integration/adapters/CombatSystemAdapter.java`,content:`package net.worldforge.integration.adapters;

import net.minecraftforge.fml.ModList;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.combat.CombatCatalog;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.integration.NoOpAdapter;

import java.util.Set;

/**
 * Combat adapter. Vanilla damage types are an official Minecraft registry, so
 * this adapter binds the vanilla surface. Apotheosis / Better Combat stay
 * detected-only until their public APIs are used.
 */
public final class CombatSystemAdapter extends NoOpAdapter {
    private final CombatCatalog catalog;

    public CombatSystemAdapter(boolean enabled, CombatCatalog catalog) {
        super("worldforge:combat", IntegrationDomain.COMBAT, Set.of("minecraft", "apotheosis", "bettercombat"), enabled);
        this.catalog = catalog;
    }

    @Override
    public boolean tryBind() {
        if (!enabled()) {
            setState(AdapterState.SKIPPED_DISABLED);
            WorldForgeLog.debug(LogCategory.INTEGRATION, "%s disabled by config", id());
            return false;
        }
        markBound("minecraft");
        catalog.markVanillaBound();
        StringBuilder extra = new StringBuilder();
        for (String target : targetModIds()) {
            if ("minecraft".equals(target)) {
                continue;
            }
            if (ModList.get().isLoaded(target)) {
                catalog.recordExtra(target);
                extra.append(' ').append(target);
            }
        }
        WorldForgeLog.info(LogCategory.INTEGRATION,
                "%s bound vanilla damage-type registry%s",
                id(),
                extra.isEmpty() ? "" : "; detected extra (unbound):" + extra);
        return true;
    }
}
`},{path:`src/main/java/net/worldforge/integration/adapters/MagicSystemAdapter.java`,content:`package net.worldforge.integration.adapters;

import net.minecraftforge.fml.ModList;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.api.knowledge.KnowledgeStatus;
import net.worldforge.api.magic.MagicSystemDescriptor;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.integration.LoaderCompatibilityCatalog;
import net.worldforge.integration.NoOpAdapter;
import net.worldforge.magic.MagicCatalog;

import java.util.Set;

/**
 * Magic-system adapter.
 *
 * Known targets (not Maven dependencies):
 * - ars_nouveau: 1.21.x API is NeoForge. Not compiled into this Forge jar.
 * - irons_spellbooks: Forge API is documented for 1.20.1 and below; 1.21 is NeoForge.
 *
 * Detecting a magic mod is not the same as understanding it. This adapter
 * records the loader mismatch and refuses to bind.
 */
public final class MagicSystemAdapter extends NoOpAdapter {
    private final MagicCatalog catalog;

    public MagicSystemAdapter(boolean enabled, MagicCatalog catalog) {
        super("worldforge:magic", IntegrationDomain.MAGIC, Set.of("ars_nouveau", "irons_spellbooks"), enabled);
        this.catalog = catalog;
    }

    @Override
    public boolean tryBind() {
        catalog.clear();
        if (!enabled()) {
            setState(AdapterState.SKIPPED_DISABLED);
            WorldForgeLog.debug(LogCategory.INTEGRATION, "%s disabled by config", id());
            return false;
        }
        int found = 0;
        for (String target : targetModIds()) {
            if (!ModList.get().isLoaded(target)) {
                continue;
            }
            found++;
            var note = LoaderCompatibilityCatalog.find(target);
            catalog.record(new MagicSystemDescriptor(
                    target,
                    note.map(n -> n.status()).orElse(KnowledgeStatus.PARTIALLY_KNOWN),
                    Set.of(),
                    note.map(n -> n.reason()).orElse(
                            "Mod loaded. No official magic API is compiled into WorldForge; capabilities stay empty.")
            ));
        }
        if (found == 0) {
            setState(AdapterState.SKIPPED_MISSING_TARGET);
            WorldForgeLog.debug(LogCategory.INTEGRATION, "%s: no magic target loaded", id());
            return false;
        }
        setState(AdapterState.SKIPPED_NO_API);
        WorldForgeLog.info(LogCategory.INTEGRATION,
                "%s recorded %d magic system(s) as PARTIALLY_KNOWN — not bound", id(), found);
        return false;
    }
}
`},{path:`src/main/java/net/worldforge/integration/adapters/QuestAdapter.java`,content:`package net.worldforge.integration.adapters;

import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.integration.NoOpAdapter;

import java.util.Set;

public final class QuestAdapter extends NoOpAdapter {
    public QuestAdapter(boolean enabled) {
        super("worldforge:quest", IntegrationDomain.QUEST, Set.of("ftbquests", "heracles"), enabled);
    }
}
`},{path:`src/main/java/net/worldforge/integration/adapters/TechnologyAdapter.java`,content:`package net.worldforge.integration.adapters;

import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.integration.NoOpAdapter;

import java.util.Set;

public final class TechnologyAdapter extends NoOpAdapter {
    public TechnologyAdapter(boolean enabled) {
        super("worldforge:technology", IntegrationDomain.TECHNOLOGY, Set.of("create", "immersiveengineering", "mekanism"), enabled);
    }
}
`},{path:`src/main/java/net/worldforge/integration/adapters/WorldgenAdapter.java`,content:`package net.worldforge.integration.adapters;

import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.integration.NoOpAdapter;

import java.util.Set;

/**
 * Worldgen mods are often datapack-only. Registries can be counted; mechanics
 * stay UNKNOWN/PARTIAL unless an API exists.
 */
public final class WorldgenAdapter extends NoOpAdapter {
    public WorldgenAdapter(boolean enabled) {
        super("worldforge:worldgen", IntegrationDomain.WORLDGEN, Set.of("terralith", "biomesoplenty", "alexscaves"), enabled);
    }
}
`},{path:`src/main/java/net/worldforge/knowledge/KnowledgeLayer.java`,content:`package net.worldforge.knowledge;

import net.worldforge.api.discovery.DiscoveredMod;
import net.worldforge.api.discovery.RegistryCensus;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.api.knowledge.KnowledgeStatus;
import net.worldforge.api.knowledge.ModKnowledge;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Classifies discovered mods. Classification is deterministic and conservative.
 */
public final class KnowledgeLayer {
    private final Map<String, ModKnowledge> byId = new ConcurrentHashMap<>();

    public void put(ModKnowledge knowledge) {
        byId.put(knowledge.mod().modId(), knowledge);
    }

    public Optional<ModKnowledge> get(String modId) {
        return Optional.ofNullable(byId.get(modId));
    }

    public Collection<ModKnowledge> all() {
        return List.copyOf(byId.values());
    }

    public void clear() {
        byId.clear();
    }

    public long count(KnowledgeStatus status) {
        return byId.values().stream().filter(k -> k.status() == status).count();
    }

    public ModKnowledge classify(
            DiscoveredMod mod,
            RegistryCensus census,
            List<String> detectedApis,
            List<IntegrationDomain> domains,
            AdapterState adapterState,
            String adapterId
    ) {
        KnowledgeStatus status;
        String reason;

        boolean isPlatform = "minecraft".equals(mod.modId()) || "forge".equals(mod.modId()) || "worldforge".equals(mod.modId());
        boolean bound = adapterState == AdapterState.BOUND;
        boolean hasApi = !detectedApis.isEmpty();
        boolean hasContent = census.totalKnown() > 0;

        if (isPlatform || bound) {
            status = KnowledgeStatus.KNOWN;
            reason = isPlatform
                    ? "Platform surface: identity, registries, and lifecycle are fully inspectable."
                    : "A WorldForge adapter bound through a supported public API.";
        } else if (hasApi || hasContent) {
            status = KnowledgeStatus.PARTIALLY_KNOWN;
            reason = hasApi
                    ? "An API or integration point was detected, but no complete adapter is bound."
                    : "Registry content is visible; mechanics remain unadapted.";
        } else {
            status = KnowledgeStatus.UNKNOWN;
            reason = "Only loader metadata is available. WorldForge will not invent behaviour for this mod.";
        }

        ModKnowledge knowledge = new ModKnowledge(mod, status, census, detectedApis, domains, adapterId, reason);
        put(knowledge);
        WorldForgeLog.debug(LogCategory.DISCOVERY, "%s -> %s (%s)", mod.modId(), status, reason);
        return knowledge;
    }
}
`},{path:`src/main/java/net/worldforge/knowledge/KnowledgeScope.java`,content:`package net.worldforge.knowledge;

/**
 * Knowledge is partitioned so a world cannot inherit incompatible
 * integration state from another modpack.
 */
public enum KnowledgeScope {
    CORE,
    MODPACK,
    WORLD,
    PLAYER
}
`},{path:`src/main/java/net/worldforge/magic/MagicCatalog.java`,content:`package net.worldforge.magic;

import net.worldforge.api.magic.MagicSystem;
import net.worldforge.api.magic.MagicSystemDescriptor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Detected magic systems. Entries are informational unless a {@link MagicSystem}
 * implementation was bound through a public API.
 */
public final class MagicCatalog {
    private final List<MagicSystemDescriptor> detected = new ArrayList<>();
    private final List<MagicSystem> bound = new ArrayList<>();

    public void clear() {
        detected.clear();
        bound.clear();
    }

    public void record(MagicSystemDescriptor descriptor) {
        detected.removeIf(existing -> existing.modId().equals(descriptor.modId()));
        detected.add(descriptor);
    }

    public void bind(MagicSystem system) {
        bound.removeIf(existing -> existing.modId().equals(system.modId()));
        bound.add(system);
        record(system.descriptor());
    }

    public Collection<MagicSystemDescriptor> detected() {
        return List.copyOf(detected);
    }

    public Optional<MagicSystem> bound(String modId) {
        return bound.stream().filter(s -> s.modId().equals(modId)).findFirst();
    }
}
`},{path:`src/main/java/net/worldforge/persistence/DataSchemaVersion.java`,content:`package net.worldforge.persistence;

/**
 * Bump when the saved-data layout changes. Loaders must migrate or discard
 * incompatible world/modpack knowledge rather than crash.
 *
 * 1 — fingerprint + opaque world knowledge compound
 * 2 — adds authored Regions and PointsOfInterest lists
 * 3 — adds player-scoped records (cleared on fingerprint mismatch)
 */
public final class DataSchemaVersion {
    public static final int CURRENT = 3;

    private DataSchemaVersion() {}
}`},{path:`src/main/java/net/worldforge/persistence/WorldForgeSavedData.java`,content:`package net.worldforge.persistence;

import net.minecraft.core.HolderLookup;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.nbt.Tag;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.world.level.saveddata.SavedData;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

/**
 * World-scoped persistent knowledge. Survives restarts.
 * Modpack fingerprint is stored so a world opened under a different pack
 * does not inherit stale integration state.
 */
public final class WorldForgeSavedData extends SavedData {
    public static final String NAME = "worldforge";

    private int schema = DataSchemaVersion.CURRENT;
    private String modpackFingerprint = "";
    private CompoundTag worldKnowledge = new CompoundTag();
    private ListTag regions = new ListTag();
    private ListTag pois = new ListTag();
    private ListTag players = new ListTag();

    public static WorldForgeSavedData create() {
        return new WorldForgeSavedData();
    }

    public static WorldForgeSavedData load(CompoundTag tag, HolderLookup.Provider lookup) {
        WorldForgeSavedData data = new WorldForgeSavedData();
        data.schema = tag.getInt("Schema");
        data.modpackFingerprint = tag.getString("ModpackFingerprint");
        if (tag.contains("WorldKnowledge")) {
            data.worldKnowledge = tag.getCompound("WorldKnowledge");
        }
        if (tag.contains("Regions", Tag.TAG_LIST)) {
            data.regions = tag.getList("Regions", Tag.TAG_COMPOUND);
        }
        if (tag.contains("PointsOfInterest", Tag.TAG_LIST)) {
            data.pois = tag.getList("PointsOfInterest", Tag.TAG_COMPOUND);
        }
        if (tag.contains("Players", Tag.TAG_LIST)) {
            data.players = tag.getList("Players", Tag.TAG_COMPOUND);
        }
        if (data.schema != DataSchemaVersion.CURRENT) {
            WorldForgeLog.warn(LogCategory.WORLD, "Saved data schema %d != %d; keeping payload, marking dirty for rewrite",
                    data.schema, DataSchemaVersion.CURRENT);
            data.schema = DataSchemaVersion.CURRENT;
            data.setDirty();
        }
        return data;
    }

    public static WorldForgeSavedData get(ServerLevel level) {
        return level.getDataStorage().computeIfAbsent(
                new SavedData.Factory<>(WorldForgeSavedData::create, WorldForgeSavedData::load),
                NAME
        );
    }

    @Override
    public CompoundTag save(CompoundTag tag, HolderLookup.Provider lookup) {
        tag.putInt("Schema", schema);
        tag.putString("ModpackFingerprint", modpackFingerprint);
        tag.put("WorldKnowledge", worldKnowledge.copy());
        tag.put("Regions", regions.copy());
        tag.put("PointsOfInterest", pois.copy());
        tag.put("Players", players.copy());
        return tag;
    }

    public String modpackFingerprint() {
        return modpackFingerprint;
    }

    public void setModpackFingerprint(String fingerprint) {
        if (fingerprint == null) {
            fingerprint = "";
        }
        if (!fingerprint.equals(this.modpackFingerprint)) {
            this.modpackFingerprint = fingerprint;
            setDirty();
        }
    }

    public CompoundTag worldKnowledge() {
        return worldKnowledge;
    }

    public void setWorldKnowledge(CompoundTag tag) {
        this.worldKnowledge = tag == null ? new CompoundTag() : tag.copy();
        setDirty();
    }

    public ListTag regions() {
        return regions;
    }

    public void setRegions(ListTag list) {
        this.regions = list == null ? new ListTag() : list.copy();
        setDirty();
    }

    public ListTag pois() {
        return pois;
    }

    public void setPois(ListTag list) {
        this.pois = list == null ? new ListTag() : list.copy();
        setDirty();
    }

    public ListTag players() {
        return players;
    }

    public void setPlayers(ListTag list) {
        this.players = list == null ? new ListTag() : list.copy();
        setDirty();
    }

    /**
     * If the running pack does not match the world, drop integration state
     * and player records rather than applying incompatible adapters.
     * Authored regions stay — they are world geography, not pack-specific bindings.
     * Player records go because dimension ids are pack-specific.
     */
    public boolean reconcileFingerprint(String currentFingerprint) {
        if (modpackFingerprint.isEmpty()) {
            setModpackFingerprint(currentFingerprint);
            return true;
        }
        if (modpackFingerprint.equals(currentFingerprint)) {
            return true;
        }
        WorldForgeLog.warn(LogCategory.COMPATIBILITY,
                "Modpack fingerprint changed (%s -> %s). Clearing world integration state and player knowledge.",
                modpackFingerprint, currentFingerprint);
        worldKnowledge = new CompoundTag();
        players = new ListTag();
        setModpackFingerprint(currentFingerprint);
        return false;
    }
}
`},{path:`src/main/java/net/worldforge/world/DimensionProbe.java`,content:`package net.worldforge.world;

import net.minecraft.server.level.ServerLevel;
import net.worldforge.api.world.DimensionSnapshot;

public final class DimensionProbe {
    private DimensionProbe() {}

    public static DimensionSnapshot capture(ServerLevel level) {
        String weather = level.isThundering() ? "thunder" : level.isRaining() ? "rain" : "clear";
        return new DimensionSnapshot(
                level.dimension().location().toString(),
                level.getDayTime(),
                weather,
                level.getDifficulty().getSerializedName()
        );
    }
}
`},{path:`src/main/java/net/worldforge/world/PlayerRegistry.java`,content:`package net.worldforge.world;

import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.worldforge.api.knowledge.PlayerRecord;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Player-scoped records keyed by UUID. Cleared when the modpack fingerprint changes.
 */
public final class PlayerRegistry {
    private final Map<String, PlayerRecord> players = new LinkedHashMap<>();

    public Optional<PlayerRecord> get(String uuid) {
        return Optional.ofNullable(players.get(uuid));
    }

    public Collection<PlayerRecord> all() {
        return List.copyOf(players.values());
    }

    public void clear() {
        players.clear();
    }

    public void login(String uuid, String name, String dimension, long dayTime) {
        if (uuid == null || uuid.isBlank()) {
            return;
        }
        PlayerRecord previous = players.get(uuid);
        int logins = previous == null ? 1 : previous.logins() + 1;
        players.put(uuid, new PlayerRecord(uuid, name, logins, dimension, dayTime, true));
    }

    public void logout(String uuid, long dayTime) {
        PlayerRecord previous = players.get(uuid);
        if (previous == null) {
            return;
        }
        players.put(uuid, new PlayerRecord(
                previous.uuid(),
                previous.name(),
                previous.logins(),
                previous.lastDimension(),
                dayTime,
                false
        ));
    }

    public void dimension(String uuid, String name, String dimension, long dayTime) {
        if (uuid == null || uuid.isBlank()) {
            return;
        }
        PlayerRecord previous = players.get(uuid);
        int logins = previous == null ? 1 : previous.logins();
        String resolvedName = name == null || name.isBlank()
                ? (previous == null ? uuid : previous.name())
                : name;
        players.put(uuid, new PlayerRecord(uuid, resolvedName, logins, dimension, dayTime, true));
    }

    public ListTag save() {
        ListTag list = new ListTag();
        for (PlayerRecord player : players.values()) {
            CompoundTag tag = new CompoundTag();
            tag.putString("Uuid", player.uuid());
            tag.putString("Name", player.name());
            tag.putInt("Logins", player.logins());
            tag.putString("LastDimension", player.lastDimension());
            tag.putLong("LastSeen", player.lastSeenDayTime());
            tag.putBoolean("Online", player.online());
            list.add(tag);
        }
        return list;
    }

    public void load(ListTag list) {
        players.clear();
        if (list == null) {
            return;
        }
        for (int i = 0; i < list.size(); i++) {
            CompoundTag tag = list.getCompound(i);
            String uuid = tag.getString("Uuid");
            if (uuid.isBlank()) {
                continue;
            }
            players.put(uuid, new PlayerRecord(
                    uuid,
                    tag.getString("Name"),
                    tag.getInt("Logins"),
                    tag.getString("LastDimension"),
                    tag.getLong("LastSeen"),
                    tag.getBoolean("Online")
            ));
        }
    }
}
`},{path:`src/main/java/net/worldforge/world/PoiRegistry.java`,content:`package net.worldforge.world;

import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.nbt.Tag;
import net.worldforge.api.world.PointOfInterest;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public final class PoiRegistry {
    private final Map<String, PointOfInterest> points = new LinkedHashMap<>();

    public boolean register(PointOfInterest poi) {
        if (poi == null || poi.id().isBlank()) {
            return false;
        }
        points.put(poi.id(), poi);
        return true;
    }

    public Optional<PointOfInterest> get(String id) {
        return Optional.ofNullable(points.get(id));
    }

    public Collection<PointOfInterest> all() {
        return List.copyOf(points.values());
    }

    public List<PointOfInterest> inRegion(String regionId) {
        return points.values().stream().filter(p -> p.regionId().equals(regionId)).toList();
    }

    public void clear() {
        points.clear();
    }

    public ListTag save() {
        ListTag list = new ListTag();
        for (PointOfInterest poi : points.values()) {
            CompoundTag tag = new CompoundTag();
            tag.putString("Id", poi.id());
            tag.putString("RegionId", poi.regionId());
            tag.putString("Kind", poi.kind());
            tag.putString("Label", poi.label());
            tag.putString("Dimension", poi.dimension());
            tag.putInt("X", poi.x());
            tag.putInt("Y", poi.y());
            tag.putInt("Z", poi.z());
            list.add(tag);
        }
        return list;
    }

    public void load(ListTag list) {
        points.clear();
        if (list == null) {
            return;
        }
        for (int i = 0; i < list.size(); i++) {
            CompoundTag tag = list.getCompound(i);
            register(new PointOfInterest(
                    tag.getString("Id"),
                    tag.getString("RegionId"),
                    tag.getString("Kind"),
                    tag.getString("Label"),
                    tag.getString("Dimension"),
                    tag.getInt("X"),
                    tag.getInt("Y"),
                    tag.getInt("Z")
            ));
        }
    }

    public static final int LIST_TYPE = Tag.TAG_COMPOUND;
}
`},{path:`src/main/java/net/worldforge/world/RegionRegistry.java`,content:`package net.worldforge.world;

import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.nbt.Tag;
import net.worldforge.api.world.Region;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public final class RegionRegistry {
    private final Map<String, Region> regions = new LinkedHashMap<>();

    public boolean register(Region region) {
        if (region == null || region.id().isBlank()) {
            return false;
        }
        regions.put(region.id(), region);
        return true;
    }

    public Optional<Region> get(String id) {
        return Optional.ofNullable(regions.get(id));
    }

    public Collection<Region> all() {
        return List.copyOf(regions.values());
    }

    public Optional<Region> at(String dimension, int x, int z) {
        for (Region region : regions.values()) {
            if (region.contains(dimension, x, z)) {
                return Optional.of(region);
            }
        }
        return Optional.empty();
    }

    public void clear() {
        regions.clear();
    }

    public ListTag save() {
        ListTag list = new ListTag();
        for (Region region : regions.values()) {
            CompoundTag tag = new CompoundTag();
            tag.putString("Id", region.id());
            tag.putString("Name", region.name());
            tag.putString("Dimension", region.dimension());
            tag.putInt("X", region.x());
            tag.putInt("Z", region.z());
            tag.putInt("Radius", region.radius());
            tag.putString("BiomeHint", region.biomeHint());
            list.add(tag);
        }
        return list;
    }

    public void load(ListTag list) {
        regions.clear();
        if (list == null) {
            return;
        }
        for (int i = 0; i < list.size(); i++) {
            CompoundTag tag = list.getCompound(i);
            register(new Region(
                    tag.getString("Id"),
                    tag.getString("Name"),
                    tag.getString("Dimension"),
                    tag.getInt("X"),
                    tag.getInt("Z"),
                    Math.max(1, tag.getInt("Radius")),
                    tag.getString("BiomeHint")
            ));
        }
    }

    public static final int LIST_TYPE = Tag.TAG_COMPOUND;
}
`},{path:`src/main/java/net/worldforge/world/WorldEventBus.java`,content:`package net.worldforge.world;

import net.worldforge.api.world.WorldEvent;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.UUID;

/**
 * In-memory ring of pack-authored events. Not persisted: events are ephemeral
 * signals, world knowledge lives in SavedData.
 */
public final class WorldEventBus {
    private static final int CAPACITY = 64;
    private final Deque<WorldEvent> recent = new ArrayDeque<>(CAPACITY);

    public WorldEvent post(String type, String payload, long gameTime) {
        WorldEvent event = new WorldEvent(UUID.randomUUID().toString().substring(0, 8), type, payload, gameTime);
        if (recent.size() == CAPACITY) {
            recent.removeFirst();
        }
        recent.addLast(event);
        WorldForgeLog.debug(LogCategory.WORLD, "world event %s %s", event.type(), event.payload());
        return event;
    }

    public List<WorldEvent> recent() {
        return new ArrayList<>(recent);
    }

    public void clear() {
        recent.clear();
    }
}
`},{path:`src/main/java/net/worldforge/world/WorldStateService.java`,content:`package net.worldforge.world;

import net.minecraft.server.MinecraftServer;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.world.level.Level;
import net.worldforge.api.knowledge.PlayerRecord;
import net.worldforge.api.world.DimensionSnapshot;
import net.worldforge.api.world.PointOfInterest;
import net.worldforge.api.world.Region;
import net.worldforge.api.world.WorldEvent;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.discovery.ModDiscoveryService;
import net.worldforge.persistence.DataSchemaVersion;
import net.worldforge.persistence.WorldForgeSavedData;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * World façade: snapshot, authored regions, POIs, ephemeral world events.
 * No chunk scans. Persistence is SavedData keyed by modpack fingerprint.
 */
public final class WorldStateService {
    private final RegionRegistry regions = new RegionRegistry();
    private final PoiRegistry pois = new PoiRegistry();
    private final PlayerRegistry players = new PlayerRegistry();
    private final WorldEventBus events = new WorldEventBus();
    private ServerLevel overworld;
    private WorldForgeSavedData savedData;
    private DimensionSnapshot snapshot;

    public void attach(MinecraftServer server, ModDiscoveryService discovery) {
        this.overworld = server.getLevel(Level.OVERWORLD);
        if (overworld == null) {
            WorldForgeLog.warn(LogCategory.WORLD, "Overworld unavailable; persistent knowledge skipped");
            return;
        }
        this.savedData = WorldForgeSavedData.get(overworld);
        boolean compatible = savedData.reconcileFingerprint(discovery.fingerprint());
        regions.load(savedData.regions());
        pois.load(savedData.pois());
        players.load(savedData.players());
        if (regions.all().isEmpty()) {
            seedDefaults();
            persist();
        }
        refreshSnapshot();
        events.post("world.load", snapshot == null ? "overworld" : snapshot.dimension(), overworld.getDayTime());
        WorldForgeLog.info(LogCategory.WORLD,
                "World systems attached (compatible=%s, schema=%d, regions=%d, pois=%d, players=%d)",
                compatible, DataSchemaVersion.CURRENT, regions.all().size(), pois.all().size(), players.all().size());
    }

    public void detach() {
        persist();
        if (overworld != null) {
            events.post("world.save", "overworld", overworld.getDayTime());
        }
        overworld = null;
        savedData = null;
        snapshot = null;
        regions.clear();
        pois.clear();
        players.clear();
        events.clear();
    }

    public void refreshSnapshot() {
        if (overworld != null) {
            snapshot = DimensionProbe.capture(overworld);
        }
    }

    public boolean registerRegion(Region region) {
        boolean ok = regions.register(region);
        if (ok) {
            persist();
            long time = overworld == null ? 0L : overworld.getDayTime();
            events.post("region.register", region.id(), time);
        }
        return ok;
    }

    public boolean registerPoi(PointOfInterest poi) {
        boolean ok = pois.register(poi);
        if (ok) {
            persist();
            long time = overworld == null ? 0L : overworld.getDayTime();
            events.post("poi.register", poi.id(), time);
        }
        return ok;
    }

    public WorldEvent postEvent(String type, String payload) {
        long time = overworld == null ? 0L : overworld.getDayTime();
        return events.post(type, payload, time);
    }

    public void noteLogin(String uuid, String name, String dimension, long dayTime) {
        players.login(uuid, name, dimension, dayTime);
        persistPlayers();
        events.post("player.login", name == null ? uuid : name, dayTime);
    }

    public void noteLogout(String uuid, long dayTime) {
        players.logout(uuid, dayTime);
        persistPlayers();
        String name = players.get(uuid).map(PlayerRecord::name).orElse(uuid);
        events.post("player.logout", name, dayTime);
    }

    public void noteDimension(String uuid, String name, String dimension, long dayTime) {
        players.dimension(uuid, name, dimension, dayTime);
        persistPlayers();
        events.post("player.dimension", name == null ? uuid : name, dayTime);
    }

    public Optional<DimensionSnapshot> snapshot() {
        return Optional.ofNullable(snapshot);
    }

    public Collection<Region> regions() {
        return regions.all();
    }

    public Optional<Region> region(String id) {
        return regions.get(id);
    }

    public Optional<Region> regionAt(String dimension, int x, int z) {
        return regions.at(dimension, x, z);
    }

    public Collection<PointOfInterest> pointsOfInterest() {
        return pois.all();
    }

    public List<WorldEvent> recentEvents() {
        return events.recent();
    }

    public Collection<PlayerRecord> players() {
        return players.all();
    }

    public Optional<PlayerRecord> player(String uuid) {
        return players.get(uuid);
    }

    public ServerLevel overworld() {
        return overworld;
    }

    public WorldForgeSavedData savedData() {
        return savedData;
    }

    private void seedDefaults() {
        registerRegion(new Region("spawn", "Spawn plateau", "minecraft:overworld", 0, 0, 96, "minecraft:plains"));
        registerPoi(new PointOfInterest("spawn-stone", "spawn", "landmark", "World origin", "minecraft:overworld", 0, 64, 0));
        WorldForgeLog.info(LogCategory.WORLD, "Seeded default spawn region (authored, not scanned)");
    }

    private void persist() {
        if (savedData == null) {
            return;
        }
        savedData.setRegions(regions.save());
        savedData.setPois(pois.save());
        savedData.setPlayers(players.save());
    }

    private void persistPlayers() {
        if (savedData == null) {
            return;
        }
        savedData.setPlayers(players.save());
    }
}
`},{path:`src/main/resources/pack.mcmeta`,content:`{
  "pack": {
    "description": "WorldForge resources",
    "pack_format": 34
  }
}
`},{path:`src/main/resources/META-INF/mods.toml`,content:`modLoader="javafml"
loaderVersion="\${loader_version_range}"
license="\${mod_license}"
issueTrackerURL="https://github.com/SoloGam/WorldForge/issues"

[[mods]]
modId="\${mod_id}"
version="\${mod_version}"
displayName="\${mod_name}"
displayURL="https://github.com/SoloGam/WorldForge"
authors="\${mod_authors}"
description='''\${mod_description}'''

[[dependencies.\${mod_id}]]
    modId="forge"
    mandatory=true
    versionRange="\${forge_version_range}"
    ordering="NONE"
    side="BOTH"
[[dependencies.\${mod_id}]]
    modId="minecraft"
    mandatory=true
    versionRange="\${minecraft_version_range}"
    ordering="NONE"
    side="BOTH"
`},{path:`src/main/resources/data/worldforge/adapters/combat.json`,content:`{
  "id": "worldforge:combat",
  "domain": "COMBAT",
  "targets": ["minecraft", "apotheosis", "bettercombat"],
  "bindPolicy": "vanilla-registry-then-documented-api",
  "notes": "Vanilla Registries.DAMAGE_TYPE is the official combat surface. Extra mods stay detected-only."
}
`},{path:`src/main/resources/data/worldforge/adapters/magic.json`,content:`{
  "id": "worldforge:magic",
  "domain": "MAGIC",
  "targets": ["ars_nouveau", "irons_spellbooks"],
  "bindPolicy": "documented-api-only",
  "notes": "1.21.1 APIs for these mods are published for NeoForge. WorldForge is Forge and does not compile them. src/optional-ars is excluded from the jar."
}`},{path:`src/main/resources/data/worldforge/adapters/quest.json`,content:`{
  "id": "worldforge:quest",
  "domain": "QUEST",
  "targets": ["ftbquests", "heracles"],
  "bindPolicy": "documented-api-only",
  "notes": "Quest graphs stay unbound until an official quest API is compiled in."
}
`},{path:`src/main/resources/data/worldforge/adapters/technology.json`,content:`{
  "id": "worldforge:technology",
  "domain": "TECHNOLOGY",
  "targets": ["create", "immersiveengineering", "mekanism"],
  "bindPolicy": "documented-api-only",
  "notes": "Create/IE/Mekanism presence is not kinetic or energy simulation."
}
`},{path:`src/main/resources/data/worldforge/adapters/worldgen.json`,content:`{
  "id": "worldforge:worldgen",
  "domain": "WORLDGEN",
  "targets": ["terralith", "biomesoplenty", "alexscaves"],
  "bindPolicy": "registry-census-only",
  "notes": "Datapack biomes and structures can be counted. Generation mechanics stay unknown."
}
`},{path:`src/optional-ars/README.md`,content:"# Optional Ars Nouveau bridge — disabled\n\nThis directory is **not** a Gradle source set. `./gradlew build` does not compile it and does not put it in `worldforge-*.jar`.\n\nArs Nouveau 1.21.x ships its public API on **NeoForge** (`net.neoforged`, `ArsNouveauAPI.getInstance()`). WorldForge is a **Forge 52.1.0** mod. Pulling that API in would be a hard dependency on the wrong loader.\n\n`./gradlew explainOptionalArs` prints the same refusal.\n\nDo not:\n\n- add `maven.blamejared.com` or a NeoForge coordinate to `build.gradle`\n- import `com.hollingsworth.arsnouveau` or `net.neoforged` from `src/main`\n- reflection-scrape Ars internals to fake a binding\n\nA Forge-published Ars API would be required before this bridge can do anything other than refuse.\n"},{path:`src/optional-ars/java/net/worldforge/optional/ars/ArsNouveauBridge.java`,content:`package net.worldforge.optional.ars;

/**
 * Not on the default compile graph and not packaged in the Forge jar.
 *
 * Ars Nouveau 1.21.x publishes {@code ArsNouveauAPI} for NeoForge
 * ({@code net.neoforged}). WorldForge targets Forge 52.1.0. Importing that
 * API, or adding a NeoForge Maven coordinate, would make {@code ./gradlew build}
 * depend on the wrong loader.
 *
 * This class intentionally imports nothing from Ars or NeoForge. It exists so
 * the refusal is in the tree, not implied by a missing folder. Do not call it
 * from {@code src/main}.
 */
public final class ArsNouveauBridge {
    private ArsNouveauBridge() {}

    public static boolean available() {
        return false;
    }

    public static String refusal() {
        return "Ars Nouveau 1.21.1 API is NeoForge. WorldForge will not compile it into a Forge jar.";
    }
}
`}],l=a(t()),u=r();function d(){let t=i(e=>e.selectedSource),r=i(e=>e.selectSource),[a,d]=(0,l.useState)(``),f=(0,l.useMemo)(()=>{let e=a.trim().toLowerCase(),t=new Set([`CREDITS.txt`,`LICENSE.txt`,`.gitattributes`,`gradlew`,`gradlew.bat`]);return c.filter(n=>!t.has(n.path)&&(!e||n.path.toLowerCase().includes(e)))},[a]),p=c.find(e=>e.path===t)??f[0];return(0,u.jsxs)(`div`,{className:`mx-auto max-w-6xl`,children:[(0,u.jsxs)(`header`,{className:`mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`p`,{className:`text-xs uppercase tracking-[0.18em] text-muted`,children:`net.worldforge`}),(0,u.jsx)(`h1`,{className:`mt-2 font-display text-4xl tracking-tight`,children:`Forge source`}),(0,u.jsx)(`p`,{className:`mt-3 max-w-xl text-muted`,children:`Production Java for Minecraft 1.21.1 / Forge 52.1.0. 0.4.0 persists player knowledge and refuses NeoForge magic APIs instead of compiling them into this Forge jar.`})]}),(0,u.jsx)(o,{asChild:!0,children:(0,u.jsxs)(`a`,{href:`/downloads/worldforge-0.4.0-forge-1.21.1.zip`,children:[(0,u.jsx)(e,{className:`size-4`}),`Download MDK`]})})]}),(0,u.jsx)(s,{value:a,onChange:e=>d(e.target.value),placeholder:`Filter files`,"aria-label":`Filter source files`,className:`mb-4`}),(0,u.jsxs)(`div`,{className:`grid lg:grid-cols-[16rem_1fr] gap-4`,children:[(0,u.jsx)(`ul`,{className:`rounded-xl border border-border bg-bg-elevated max-h-[32rem] overflow-y-auto`,children:f.map(e=>(0,u.jsx)(`li`,{children:(0,u.jsx)(`button`,{type:`button`,onClick:()=>r(e.path),className:n(`w-full truncate px-3 py-2.5 text-left font-mono text-[11px] border-b border-border last:border-0`,p?.path===e.path?`bg-bg-subtle text-fg`:`text-muted hover:text-fg`),children:e.path.replace(/^src\/main\/java\//,``)})},e.path))}),(0,u.jsxs)(`article`,{className:`rounded-xl border border-border bg-bg-elevated overflow-hidden min-w-0`,children:[(0,u.jsx)(`header`,{className:`border-b border-border px-4 py-2 font-mono text-xs text-muted truncate`,children:p?.path}),(0,u.jsx)(`pre`,{className:`p-4 overflow-auto max-h-[32rem] text-[12px] leading-relaxed font-mono text-fg`,children:p?.content})]})]})]})}export{d as component};