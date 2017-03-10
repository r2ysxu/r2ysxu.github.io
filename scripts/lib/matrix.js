var MvMatrix = {

  mvMatrix : null,
  mvMatrixStack : [],

  loadIdentity : function() {
  	MvMatrix.mvMatrix = Matrix.I(4);
  },

  multMatrix : function(m) {
  	MvMatrix.mvMatrix = MvMatrix.mvMatrix.x(m);
  },

  mvTranslate : function(v) {
  	MvMatrix.multMatrix(Matrix.Translation($V([ v[0], v[1], v[2] ])).ensure4x4());
  },


  mvPushMatrix : function(m) {
    if (m) {
      MvMatrix.mvMatrixStack.push(m.dup());
      MvMatrix.mvMatrix = m.dup();
    } else {
      MvMatrix.mvMatrixStack.push(MvMatrix.mvMatrix.dup());
    }
  },

  mvPopMatrix : function() {
    if (!MvMatrix.mvMatrixStack.length) {
      throw("Can't pop from an empty matrix stack.");
    }
    
    MvMatrix.mvMatrix = MvMatrix.mvMatrixStack.pop();
    return MvMatrix.mvMatrix;
  },

  mvRotate : function(angle, v) {
    var inRadians = angle * Math.PI / 180.0;
    
    var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
    MvMatrix.multMatrix(m);
  }
}