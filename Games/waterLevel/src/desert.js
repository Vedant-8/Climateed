import { k } from "./kaboom-context";
import { scaleFactor, dialogueData, initial_conversation, final_conversation, realDialogueData, pre_ice_level_conversation, pre_parking_scene_conversation, post_ice_level_conversation, pre_cat_level_conversation, post_cat_level_conversation, pre_forest_level_conversation, pre_desert_level_conversation, post_desert_level_conversation } from "./constants";
import { displayDialog, displayConversation } from "./dialogue";
import { setCamScale } from "./camera";
import { loadSprites } from "./sprites-loader";

loadSprites(k);

let forestSound = null

let desertSound = null

let iceSound = null

let catSound = null

let parkingSound = null

let schoolSound = null

let victory = null

let gameover = null

k.setBackground(k.Color.fromHex("#311047"));

k.scene("main", async () => {
  const mapData = await (await fetch("./assets/game/map.json")).json();
  const layers = mapData.layers;

  const map = k.add([
    k.sprite("map"),
    k.pos(0),
    k.scale(scaleFactor)
  ]);

  const player = k.make([
    k.sprite("birds", { anim: "fly" }),
    k.area({ shape: new k.Rect(k.vec2(0, 3), 10, 10) }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(1.5),
    {
      speed: 250,
      // direction: "down",
      isInDialogue: false
    },
    "player"
  ])

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({ shape: new k.Rect(k.vec2(0), boundary.width, boundary.height) }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.isInDialogue = true;
            displayDialog(dialogueData[boundary.name], () => {
              player.isInDialogue = false;
            });
          })
        }
      }

      continue;
    }

    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player);

          continue;
        }
      }
    }
  }

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y + 100);
  });

  k.onMouseDown((mouseBtn) => {
    if (mouseBtn !== "left" || player.isInDialogue)
      return;

    const worldMousePos = k.toWorld(k.mousePos());
    player.moveTo(worldMousePos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);

    if (Math.abs(mouseAngle) > 90) {
      player.flipX = false;
      player.direction = "right";

      return;
    }

    if (Math.abs(mouseAngle) < 90) {
      player.flipX = true;
      player.direction = "left";

      return;
    }
  });

  k.onKeyDown((key) => {
    if (player.isInDialogue) return;
  
    if (["right", "d"].includes(key)) {
      player.flipX = false;
      player.direction = "right";
      player.move(player.speed, 0);
    } else if (["left", "a"].includes(key)) {
      player.flipX = true;
      player.direction = "left";
      player.move(-player.speed, 0);
    } else if (["up", "w"].includes(key)) {
      player.direction = "up";
      player.move(0, -player.speed);
    } else if (["down", "s"].includes(key)) {
      player.direction = "down";
      player.move(0, player.speed);
    }
  });
  
    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }

    if (nbOfKeyPressed > 1) return;
    if (player.isInDialogue) return;

    if (keyMap[0]) {
      player.flipX = false;
      player.direction = "right";
      player.move(player.speed, 0);
      return;
    }

    if (keyMap[1]) {
      player.flipX = true;
      player.direction = "left";
      player.move(-player.speed, 0);
      return;
    }

    if (keyMap[2]) {
      player.direction = "up";
      player.move(0, -player.speed);
      return;
    }

    if (keyMap[3]) {
      player.direction = "down";
      player.move(0, player.speed);
    }
  })
k.scene("desert", async ({ hasConversation }) => {
  try {
    forestSound.stop()
  }
  catch { }

  desertSound = k.play("desertSound", { volume: 0.2, loop: true })

  const mapData = await (await fetch("./assets/game/desert-map.json")).json();
  const layers = mapData.layers;

  const map = k.add([
    k.sprite("desert-map"),
    k.pos(0),
    k.scale(scaleFactor / 4)
  ]);

  const player = k.make([
    k.sprite("foxes", { anim: "idle-side" }),
    k.area({ shape: new k.Rect(k.vec2(0, 3), 10, 10) }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor / 4),
    {
      speed: 250,
      direction: "right",
      isInDialogue: true
    },
    "player"
  ]);

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y + 100);
  });

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({ shape: new k.Rect(k.vec2(0), boundary.width, boundary.height) }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            if (boundary.name === "final") {
              k.go("transition", { conversation: post_desert_level_conversation, nextScene: "classroom" })
            } else {
              player.isInDialogue = true;

              displayDialog(realDialogueData[boundary.name], () => {
                player.isInDialogue = false;
              });
            }
          })
        }
      }

      continue;
    }

    if (layer.name === "spawnpoint") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor / 4,
            (map.pos.y + entity.y) * scaleFactor / 4
          );
          k.add(player);

          continue;
        }
      }
    }
  }

  if (hasConversation) {
    displayConversation(pre_desert_level_conversation, () => {
      player.isInDialogue = false
    });
  }

  k.onKeyDown((key) => {
    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"),
      k.isKeyDown("up"),
      k.isKeyDown("down"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }

    if (nbOfKeyPressed > 1) return;
    if (player.isInDialogue) return;

    if (keyMap[0]) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      player.move(player.speed, 0);
      return;
    }

    if (keyMap[1]) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      player.move(-player.speed, 0);
      return;
    }

    if (keyMap[2]) {
      player.direction = "up";
      if (player.curAnim() !== "walk-up") player.play("walk-up");
      player.move(0, -player.speed);
      return;
    }

    if (keyMap[3]) {
      player.direction = "down";
      if (player.curAnim() !== "walk-down") player.play("walk-down");
      player.move(0, player.speed);
    }
  })

  function stopAnimation() {
    if (player.direction === "down") {
      player.play("idle-down");

      return;
    }

    if (player.direction === "up") {
      player.play("idle-up");

      return;
    }

    player.play("idle-side");
  }

  // k.onMouseRelease(stopAnimation);
  k.onKeyRelease(stopAnimation);
});


k.scene("transition", async ({ conversation, nextScene }) => {
  try {
    desertSound.stop()
  }
  catch {
    try {
      catSound.stop()
    }
    catch {
      try {
        iceSound.stop()
      }
      catch {
        try {
          schoolSound.stop()
        }
        catch {
          try {
            parkingSound.stop()
          }
          catch { }
        }
      }
    }
  }

  victory = k.play("victory", { volume: 0.2, loop: false })

  if (nextScene === "classroom") {
    displayConversation(conversation, () => {
      k.go(nextScene, { isFinalScene: true });
    });
  } else {
    // displayConversation(conversation=, () => {
      k.go(nextScene, { hasConversation: true });
    // });
  }
});

k.scene("lose", async ({ backTo }) => {
  try {
    desertSound.stop()
  }
  catch {
    try {
      catSound.stop()
    }
    catch {
      try {
        iceSound.stop()
      }
      catch {
        try {
          schoolSound.stop()
        }
        catch {
          try {
            parkingSound.stop()
          }
          catch { }
        }
      }
    }
  }  

  gameover = k.play("gameover", { volume: 0.2, loop: false })

  k.add([
    k.text("You lose!"),
    k.pos(k.width() / 2, k.height() / 2 - 58),
    k.scale(2),
    k.anchor("center"),
  ]);

  k.add([
    k.text("Looks like the Climate Crisis' efects are not so easy to ignore, huh?"),
    k.pos(k.width() / 2, k.height() / 2 + 58),
    k.scale(0.75),
    k.anchor("center"),
  ]);

  k.add([
    k.text("Press SPACE to play again."),
    k.pos(k.width() / 2, k.height() / 2 + 138),
    k.scale(1),
    k.anchor("center"),
  ]);

  k.onKeyPress("space", () => {
    k.go(backTo, { hasConversation: false })
  });
});


// k.go("transition", { conversation: post_cat_level_conversation, nextScene: "forest" })
k.go("desert", { hasConversation: true })
