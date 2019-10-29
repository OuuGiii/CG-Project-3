# CG-Project-3
The 3 lab of the course Computer Graphics

Third work<br>Interactive Scene with Mesh, Materials and Lights

### Objectives
The objectives of the third lab work are to understand the basics of lighting and the concepts of material, directional light source and spotlight light source. Geometric modeling by instantiation of primitives and creation of polygon meshes is also an objective.
The evaluation of this third work will be carried out in the week of 4-8 November and corresponds to 5 values ​​in the lab grade. This work has an estimated effort of 10 hours per group member, spread over two weeks.
Do not forget to inform the laboratory teacher of the hours spent by the group in performing this work (group average).
 
### Tasks
The tasks for the Third Job are:
- Create a scene containing a painting with an Op Art painting (Figure A.1), a polyhedral sculpture (Figure B.1). The painting must respect the visual appearance of Figure A.1: it has a gray background, black squares and white circles that are properly distributed in order to create the desired optical illusion when lighting calculation is disabled (see Point 2). Each element of the painting should be modeled using geometric primitives (parallelepipeds and cylinders). The sculptural piece should consist of an icosahedron constructed using polygon meshes. In order to facilitate sculptural modeling, it is suggested that they generate mesh points using the icosahedron radial formula (see Annex B) and then move each vertex so that there are no regular triangles (the icosahedron should look slightly deformed). The painting must still be framed, the sculpture on a pedestal, there must be the floor and a wall where the picture is placed that can be modeled by instantiation of primitives (using parallelepipeds). Painting and sculpture should be arranged side by side. 3 material types (MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial) must be defined for each object in the scene. [2.0 points] 
- Create the overall illumination of the scene using a directional light source. This light source shall be capable of being switched on or off by means of a key (‘Q (q) '). Additionally, it should be possible to enable and disable lighting calculation using a key (‘W (w)’). It should also be possible to toggle the type of shading between Gouraud (diffuse) and Phong using a key (‘E (e)’). [1.0 points] 
- Create a total of four spotlight (spotlight sources) distributed around the painting and sculpture that should partially illuminate these objects. This illumination should be sufficient to be able to see both the painting and the sculpture, but it need not illuminate them in their entirety. These light sources shall be capable of being activated or deactivated by means of the keys '1' to '4' which turn each spotlight on and off individually. The spotlight should be geometrically modeled using two geometric primitives: a cone and a sphere by simply assigning a material type to your choice [1,5 values] 
- Defining a still camera with a view of the scene using a perspective projection that shows the entire scene using the '5' key as well as a still camera, activated using the '6' key, which is centered and points over the painting using a projection. orthogonal to visualize the desired optical illusion. [0.5 points] 

### Important notes
- Note 1: In addition to the update and display events, there is another set of events, such as pressed or released keys, timers and window resizing. We strongly suggest that such events be handled independently by their callback functions. In this Work # 3 we will require the correct implementation of window resizing events for both types of projections.
- Note 2: Finally, students should adopt object-oriented programming, always following good programming practices that allow reuse of code in later deliveries and facilitate scalability.
- Note 3: Cannot use modeling tools. The meshes must be modeled manually.

### Suggestions
- Before defining the scene materials, we suggest that you begin by experimenting with a simple object and material so that you can test and understand the various parameters individually.
- For good lighting results on large surfaces, they should be subdivided into smaller polygons.
- From three.js.r69 on, to orient a spotlight light source (or any other kind of orientable light) to a point is not enough to assign Light.target.position the coordinates of that point. You must first include Light.target in the scene (for example, scene.add (mySpot.target);) or apply Light.target the updateMatrixWorld function every time you change the position of the point to
