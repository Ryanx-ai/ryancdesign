"""New October 2026 Phing form study. Run with Blender --background --python.
Not a reconstruction of the original AI-generated character artwork/process.
Pass an output directory after --; no original source files are modified.
"""
import bpy, sys, os, math
from mathutils import Vector, Quaternion
out = sys.argv[sys.argv.index('--') + 1]
os.makedirs(out, exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
def material(name, color):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
    bs=m.node_tree.nodes.get('Principled BSDF'); bs.inputs['Base Color'].default_value=(*color,1); bs.inputs['Roughness'].default_value=.72
    return m
clay=material('Raw clay',(.56,.59,.58)); eyes=material('Eyes',(.025,.035,.027))
colors=[material('Cream',(.78,.69,.48)),material('Moss',(.34,.45,.20)),material('Earth',(.58,.36,.22))]
forms=[]
for i,x in enumerate([-2.5,0,2.5]):
    mb=bpy.data.metaballs.new('Phing form'); mb.resolution=.10; mb.render_resolution=.065; mb.threshold=.6
    ob=bpy.data.objects.new(['Phing — cream','Phing — moss','Phing — earth'][i],mb); bpy.context.collection.objects.link(ob); ob.location.x=x
    for co,r in [((0,0,.85),1.18),((.28,.1,1.4),.75),((-.55,-.03,.68),.65),((.65,0,.65),.62),((-.47,-.12,.22),.35),((.1,-.18,.22),.35),((.6,-.1,.22),.32)]:
        e=mb.elements.new();e.co=co;e.radius=r
    ob.scale=(1.05, .68, [1.05,.82,.95][i]);ob.data.materials.append(colors[i])
    bpy.context.view_layer.objects.active=ob;ob.select_set(True);bpy.ops.object.convert(target='MESH');ob=bpy.context.object;forms.append(ob)
    for poly in ob.data.polygons:poly.use_smooth=True
    ob.select_set(False)
    for dx in [-.32,.06]:
        bpy.ops.mesh.primitive_uv_sphere_add(segments=20,ring_count=12,location=(x+dx,-.65,.85*ob.scale.z))
        eye=bpy.context.object;eye.name='Eye';eye.scale=(.065,.045,.095);eye.data.materials.append(eyes)
        for p in eye.data.polygons:p.use_smooth=True
        eye.select_set(False)
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.05));plane=bpy.context.object;plane.name='Studio floor';plane.data.materials.append(material('Studio',(.18,.20,.19)))
bpy.ops.object.camera_add(location=(4,-12,5));camera=bpy.context.object;camera.name='Study camera';camera.rotation_euler=(Vector((0,0,.8))-camera.location).to_track_quat('-Z','Y').to_euler();camera.data.type='ORTHO';camera.data.ortho_scale=9.8;bpy.context.scene.camera=camera
for name,loc,power,size in [('Key',(-3,-4,7),1100,5),('Fill',(5,-2,5),650,4),('Rim',(0,4,6),1200,3)]:
    bpy.ops.object.light_add(type='AREA',location=loc);light=bpy.context.object;light.name=name;light.data.energy=power;light.data.size=size;light.rotation_euler=(Vector((0,0,.7))-light.location).to_track_quat('-Z','Y').to_euler()
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=32;scene.cycles.use_denoising=True
scene.render.resolution_x=1400;scene.render.resolution_y=900;scene.render.resolution_percentage=100
scene.world.color=(.22,.22,.22);scene.view_settings.view_transform='Filmic';scene.render.image_settings.file_format='PNG'
scene.render.filepath=os.path.join(out,'phings-form-render.png');bpy.ops.render.render(write_still=True)
for ob in forms:ob.data.materials[0]=clay
scene.render.filepath=os.path.join(out,'phings-clay-render.png');bpy.ops.render.render(write_still=True)
# The saved working scene opens in a real solid-mode Blender modelling viewport.
plane.hide_set(True)
for ob in bpy.data.objects:
    if ob.type in {'LIGHT','CAMERA'}:ob.hide_set(True)
bpy.ops.object.select_all(action='DESELECT')
bpy.context.view_layer.objects.active=forms[1];forms[1].select_set(True)
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type=='VIEW_3D':
            space=area.spaces.active;space.shading.type='SOLID';space.shading.light='STUDIO';space.shading.color_type='SINGLE';space.shading.single_color=(.6,.62,.6);space.shading.show_cavity=True
            space.region_3d.view_distance=11;space.region_3d.view_location=(0,0,.8);space.region_3d.view_rotation=camera.rotation_euler.to_quaternion();space.clip_end=1000
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(out,'Pangea — new form study.blend'))
